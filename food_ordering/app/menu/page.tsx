"use client";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { FaShoppingCart } from "react-icons/fa";

interface MenuItem {
  id: number;
  title: string;
  description: string;
  amount: number;
  imageUrl: string;
  visibility: boolean;
}

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState<{
    [key: number]: boolean;
  }>({});
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [showQuantity, setShowQuantity] = useState<{ [key: number]: boolean }>(
    {}
  ); // State to control quantity display

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await fetch("/api/viewMenu"); // Assuming the API route is /api/menu
        const data = await res.json();
        console.log(data.items);
        setMenuItems(data.items);
        const initialQuantities = data.items.reduce(
          (acc: { [key: number]: number }, item: MenuItem) => {
            acc[item.id] = 0; // Default quantity is 1 for each item
            return acc;
          },
          {}
        );
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);
  const saveCartToLocalStorage = (cartItems: { [key: number]: number }) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };
  const toggleExpand = (id: any) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getShortDescription = (description: string) => {
    const wordLimit = 10;
    const words = description.split(" ");

    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    } else {
      return description;
    }
  };

  const incrementQuantity = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
    updateCart(id, quantities[id] + 1);
  };

  const decrementQuantity = (id: number) => {
    setQuantities((prev) => {
      const newQuantity = prev[id] > 1 ? prev[id] - 1 : 0;
      // If quantity is set to 0, hide quantity display and show "Add to Cart" button again
      if (newQuantity === 0) {
        setShowQuantity((prevShow) => ({
          ...prevShow,
          [id]: false,
        }));
        removeFromCart(id);
      } else {
        updateCart(id, newQuantity);
      }
      return {
        ...prev,
        [id]: newQuantity,
      };
    });
  };
  const addToCart = (id: number) => {
    if (quantities[id] === 0) {
      setQuantities((prev) => ({ ...prev, [id]: 1 }));
      updateCart(id, 1);
    }
  };
  const updateCart = (id: number, quantity: number) => {
    if (quantity > 0) {
      setCart((prevCart) => {
        const updatedCart = {
          ...prevCart,
          [id]: quantity,
        };
        saveCartToLocalStorage(updatedCart);
        return updatedCart;
      });
    }
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const { [id]: _, ...remainingCart } = prevCart;
      saveCartToLocalStorage(remainingCart);
      return remainingCart;
    });
  };

  // const addToCart = (item) => {
  //   const itemInCart = cart.find((cartItem) => cartItem.id === item.id);
  //   if (itemInCart) {
  //     setCart((prev) =>
  //       prev.map((cartItem) =>
  //         cartItem.id === item.id
  //           ? { ...cartItem, quantity: cartItem.quantity + quantities[item.id] }
  //           : cartItem
  //       )
  //     );
  //   } else {
  //     setCart((prev) => [...prev, { ...item, quantity: quantities[item.id] }]);
  //   }
  //   setQuantities((prev) => ({ ...prev, [item.id]: 1 })); // Reset quantity after adding to cart
  //   setShowQuantity((prev) => ({ ...prev, [item.id]: false })); // Hide quantity input after adding to cart
  // };

  const toggleQuantity = (id: number) => {
    incrementQuantity(id);
    addToCart(id);
    setShowQuantity((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return loading ? (
    <div>
      <div className="font-semibold text-2xl w-full text-center my-4">Menu</div>
      <div className="bg-gray-50 px-10 pt-10 pb-5 mt-6 mb-20 text-white w-[90%] mx-auto rounded-xl border border-gray-100">
        <Loader />
      </div>
    </div>
  ) : (
    <div>
      <div className="font-semibold text-2xl w-full text-center my-4">Menu</div>
      <div className="bg-gray-50 px-10 pt-10 pb-5 mt-6 mb-20 text-white w-[90%] mx-auto rounded-xl border border-gray-100">
        {menuItems.length === 0 ? (
          <div className="text-center text-black font-semibold text-lg">
            No menu items available. Check Back Later...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <div
                  key={item?.id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center hover:shadow-lg text-black h-auto"
                >
                  <img
                    src={item?.imageUrl}
                    alt={item?.title}
                    className="w-full h-64 object-cover rounded-md mb-4"
                  />
                  <div className="font-bold text-xl mb-2">{item?.title}</div>
                  <div className="text-gray-700 text-center mb-4 h-10">
                    {expandedItems[item.id] ? (
                      <>
                        {item?.description}
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="text-blue-500 ml-2"
                        >
                          Show Less
                        </button>
                      </>
                    ) : (
                      <>
                        {getShortDescription(item?.description)}
                        {item?.description.split(" ").length > 10 ? (
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className="text-blue-500 ml-2"
                          >
                            Read More
                          </button>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex flex-row justify-between items-center w-full text-lg mb-4">
                    <div className="text-gray-500">${item?.amount}/500g</div>
                    {item?.visibility ? (
                      <>
                        <div className="flex flex-row items-center justify-center">
                          {showQuantity[item.id] ? (
                            <>
                              <button
                                onClick={() => decrementQuantity(item.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded-md"
                              >
                                -
                              </button>
                              <span className="text-lg mx-2 w-6 text-center">
                                {quantities[item.id] > 0
                                  ? quantities[item.id]
                                  : 0}
                              </span>
                              <button
                                onClick={() => incrementQuantity(item.id)}
                                className="px-3 py-1 bg-green-500 text-white rounded-md"
                              >
                                +
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => toggleQuantity(item.id)}
                              className="p-2 bg-blue-600 text-white rounded-md flex items-center hover:shadow-md"
                            >
                              <FaShoppingCart className="mr-2" />
                              Add
                            </button>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="text-red-500 font-semibold">
                        Out of Stock
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
