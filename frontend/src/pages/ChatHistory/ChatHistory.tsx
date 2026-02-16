import { useState } from "react";

// Return "This is a response from server {message}" after 1.5 seconds
const simulateAPI = (message: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`This is a response from server ${message}`);
    }, 1500);
  });
};

const ChatHistory = () => {
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<
    { role: string; message: string }[]
  >([]);
  const [isMessagingDisabled, setIsMessagingDisabled] =
    useState<boolean>(false);

  const sendMessage = async () => {
    setIsMessagingDisabled(true);
    const currentMessage = message;
    setChatHistory((prev) => {
      const next = [...prev];
      next.push({ role: "user", message: currentMessage });
      return next;
    });
    setMessage("");

    const response = await simulateAPI(currentMessage);
    setChatHistory((prev) => [
      ...prev,
      { role: "assistant", message: response },
    ]);
    setIsMessagingDisabled(false);
  };

  const Bubble = ({ message }: { message: string }) => {
    return <div className="border rounded-xl bg-blue-200 p-2">{message}</div>;
  };

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <nav className="p-2 bg-green-400 shadow-md sticky">
        <div className="text-xl font-bold">Chat History</div>
      </nav>
      <div className="flex-1 min-w-0 flex flex-col overflow-y-auto px-20 mx-2">
        <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
          {chatHistory.map((item, index) => (
            <div key={index} className="grid grid-cols-5 p-2">
              {item.role === "user" && <div className="col-span-2" />}
              <div className="col-span-3">
                <Bubble message={item.message} />
              </div>
              {item.role === "assistant" && <div className="col-span-2" />}
            </div>
          ))}
        </div>
        <div className="flex p-2 gap-2 bg-gray-300 items-center">
          <div className="flex-1">
            <textarea
              disabled={isMessagingDisabled}
              onChange={(event) => setMessage(event.target.value)}
              value={message}
              className="flex-1 bg-white border-2 border-gray-500 p-2 focus:outline-none w-full"
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={isMessagingDisabled || message === ""}
            type="button"
            className="p-2 rounded-md border-2 border-white bg-green-300 cursor-pointer disabled:bg-gray-400"
          >
            Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
