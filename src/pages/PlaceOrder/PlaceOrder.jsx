import { useContext, useState } from 'react';

import { StoreContext } from '../../context/StoreContext';
import { database } from '../../firebase/firebase';
import { ref, push, set } from 'firebase/database';

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, user } = useContext(StoreContext);

  // Delivery form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  // Card payment state
  const [cardDetails, setCardDetails] = useState({
    cardHolder: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const [processing, setProcessing] = useState(false);

  // Handlers
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCardChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    // Auto-format card number (add spaces every 4 digits)
    if (name === "cardNumber") {
      value = value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
      if (value.length > 19) value = value.slice(0, 19);
    }

    // Auto-format expiry (MM/YY)
    if (name === "expiry") {
      value = value.replace(/\D/g, "");
      if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
      if (value.length > 5) value = value.slice(0, 5);
    }

    // CVV: digits only, max 4
    if (name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 4);
    }

    setCardDetails({
      ...cardDetails,
      [name]: value
    });
  };

  // Validate card fields (basic)
  const validateCard = () => {
    const { cardHolder, cardNumber, expiry, cvv } = cardDetails;
    // Remove spaces for length check
    const cleanNumber = cardNumber.replace(/\s/g, "");
    if (!cardHolder.trim()) return "Cardholder name is required.";
    if (cleanNumber.length !== 16) return "Card number must be 16 digits.";
    if (!expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) return "Expiry must be in MM/YY format.";
    if (cvv.length < 3 || cvv.length > 4) return "CVV must be 3 or 4 digits.";
    return null;
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first!");
      return;
    }

    // Validate card
    const cardError = validateCard();
    if (cardError) {
      alert(cardError);
      return;
    }

    setProcessing(true);

    // --- Simulate payment processing ---
    // In real app, call a payment gateway API here
    const paymentSuccess = true; // replace with actual API result

    if (!paymentSuccess) {
      alert("Payment failed. Please try again.");
      setProcessing(false);
      return;
    }
    // --- End simulation ---

    const total = getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 150;

    try {
      const orderRef = push(ref(database, `orders/${user.uid}`));
      await set(orderRef, {
        orderId: orderRef.key,
        userId: user.uid,
        customer: formData,
        items: cartItems,
        subtotal: getTotalCartAmount(),
        deliveryFee: getTotalCartAmount() === 0 ? 0 : 150,
        total: total,
        status: "Paid", // payment successful
        createdAt: new Date().toISOString()
        // NEVER store card details in the database!
      });

      alert("Order placed successfully!");
      // Optionally clear cart and redirect

    } catch (error) {
      console.log(error);
      alert("Order failed! Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form className='mt-[100px] flex items-start justify-between gap-[50px] max-[750px]:mt-[50px] max-[750px]:flex-col max-[750px]:gap-[40px]' onSubmit={handleOrder}>
      <div className='w-full max-w-[max(30%,500px)] max-[750px]:max-w-full'>
        <p className='mb-[50px] text-[30px] font-semibold max-[750px]:mb-[30px] max-[750px]:text-[25px]'>Delivery Information</p>

        <div className="flex gap-[10px] max-[750px]:flex-col max-[750px]:gap-0">
          <input
            className="mb-[15px] w-full rounded-[4px] border border-[#c5c5c5] p-[10px] outline-[tomato] max-[750px]:box-border"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            required
          />
          <input
            className="mb-[15px] w-full rounded-[4px] border border-[#c5c5c5] p-[10px] outline-[tomato] max-[750px]:box-border"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>

        <input
          className="mb-[15px] w-full rounded-[4px] border border-[#c5c5c5] p-[10px] outline-[tomato] max-[750px]:box-border"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          required
        />

        <input
          className="mb-[15px] w-full rounded-[4px] border border-[#c5c5c5] p-[10px] outline-[tomato] max-[750px]:box-border"
          name="street"
          value={formData.street}
          onChange={handleChange}
          type="text"
          placeholder="Street"
          required
        />

        <div className="flex gap-[10px] max-[750px]:flex-col max-[750px]:gap-0">
          <input
            className="mb-[15px] w-full rounded-[4px] border border-[#c5c5c5] p-[10px] outline-[tomato] max-[750px]:box-border"
            name="city"
            value={formData.city}
            onChange={handleChange}
            type="text"
            placeholder="City"
            required
          />
          <input
            className="mb-[15px] w-full rounded-[4px] border border-[#c5c5c5] p-[10px] outline-[tomato] max-[750px]:box-border"
            name="state"
            value={formData.state}
            onChange={handleChange}
            type="text"
            placeholder="State"
            required
          />
        </div>

        <div className="flex gap-[10px] max-[750px]:flex-col max-[750px]:gap-0">
          <input
            className="mb-[15px] w-full rounded-[4px] border border-[#c5c5c5] p-[10px] outline-[tomato] max-[750px]:box-border"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            type="text"
            placeholder="Zip Code"
            required
          />
          <input
            className="mb-[15px] w-full rounded-[4px] border border-[#c5c5c5] p-[10px] outline-[tomato] max-[750px]:box-border"
            name="country"
            value={formData.country}
            onChange={handleChange}
            type="text"
            placeholder="Country"
            required
          />
        </div>

        <input
          className="mb-[15px] w-full rounded-[4px] border border-[#c5c5c5] p-[10px] outline-[tomato] max-[750px]:box-border"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          type="tel"
          placeholder="Phone"
          required
        />

        {/* ====== NEW CARD PAYMENT SECTION ====== */}
        <div className="mt-[20px] rounded-[8px] border border-[#ddd] bg-[#f9f9f9] p-[20px]">
          <p className="mb-[50px] text-[30px] font-semibold max-[750px]:mb-[30px] max-[750px]:text-[25px]">Payment Details</p>

          <input
            className="mb-[12px] box-border w-full rounded-[4px] border border-[#ccc] p-[10px] outline-[tomato]"
            name="cardHolder"
            value={cardDetails.cardHolder}
            onChange={handleCardChange}
            type="text"
            placeholder="Cardholder Name"
            required
          />

          <input
            className="mb-[12px] box-border w-full rounded-[4px] border border-[#ccc] p-[10px] outline-[tomato]"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleCardChange}
            type="text"
            placeholder="Card Number (e.g. 1234 5678 9012 3456)"
            maxLength="19"
            required
          />

          <div className="flex gap-[10px] max-[750px]:flex-col">
            <input
              className="mb-[12px] box-border w-full flex-1 rounded-[4px] border border-[#ccc] p-[10px] outline-[tomato]"
              name="expiry"
              value={cardDetails.expiry}
              onChange={handleCardChange}
              type="text"
              placeholder="MM/YY"
              maxLength="5"
              required
            />
            <input
              className="mb-[12px] box-border w-full flex-1 rounded-[4px] border border-[#ccc] p-[10px] outline-[tomato]"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleCardChange}
              type="password"
              placeholder="CVV"
              maxLength="4"
              required
            />
          </div>
        </div>
        {/* ====== END CARD SECTION ====== */}

      </div>

      <div className='w-full max-w-[max(40%,500px)] max-[750px]:max-w-full'>
        <div className="flex flex-1 flex-col gap-[20px]">
          <h2>Cart Totals</h2>

          <div className="flex justify-between text-[#555]">
            <p>Subtotal</p>
            <p>Rs.{getTotalCartAmount()}</p>
          </div>
          <hr className="my-[10px] h-px border-0 bg-[#e2e2e2]" />

          <div className="flex justify-between text-[#555]">
            <p>Delivery Fee</p>
            <p>Rs.{getTotalCartAmount() === 0 ? 0 : 150}</p>
          </div>
          <hr className="my-[10px] h-px border-0 bg-[#e2e2e2]" />

          <div className="flex justify-between text-[#555]">
            <b>Total</b>
            <b>Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 150}</b>
          </div>

          <button className="mt-[30px] w-[max(15vw,200px)] cursor-pointer rounded-[4px] border-0 bg-[tomato] py-[12px] text-white hover:bg-[rgb(202,116,101)]" type="submit" disabled={processing}>
            {processing ? "Processing..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;