import React, { useState } from "react";
import { getContract } from "../../connection/contract"; // Import the contract instance

const Login = () => {
  const [page, setPage] = useState("login");
  const [privateKey, setPrivateKey] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // To handle loading states

  const handleLogin = async () => {
    try {
      setLoading(true);
      const contract = await getContract();

      console.log("Logging in with Private Key:", privateKey);
      console.log("Logging in with Password:", password);

      // Call the login function on the contract
      const loginTx = await contract.login(privateKey, password);
      const loginResponse = await loginTx.wait();
      console.log("Login Response from Smart Contract:", loginResponse);
      if (loginResponse){
        window.location.href = "/";
        localStorage.setItem("isLoggedIn", "true");
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      const contract = await getContract();

      console.log("Signing up with Email:", email);
      console.log("Signing up with Password:", password);

      // Call the createAccount function on the contract
      const signupTx = await contract.createAccount(email, password);
      await signupTx.wait(); // Wait for transaction to be mined

      localStorage.setItem("isLoggedIn", "true");

      window.location.href = "/";
      
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-black text-white h-[89.4vh]">
      <div className="border border-1 border-[rgba(119,119,125,0.2)] p-10 rounded-lg w-[600px] flex flex-col gap-8 justify-center items-center backdrop-blur-md">
        {loading ? (
          <p>Loading...</p>
        ) : page === "login" ? (
          <>
            <h2 className="text-2xl font-bold">Login</h2>
            <input
              type="password"
              placeholder="Private Key"
              className="p-2 rounded-md bg-transparent border border-1 border-[rgba(119,119,125,0.2)] w-full h-[50px]"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 rounded-md bg-transparent border border-1 border-[rgba(119,119,125,0.2)] w-full h-[50px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-[#eb5d3a] border border-1 border-[rgba(119,119,125,0.2)] w-full h-[50px] text-[20px] rounded-md"
              onClick={handleLogin}
            >
              Login
            </button>
            <p>
              If you don't have an account?{" "}
              <span className="text-[#eb5d3a] cursor-pointer" onClick={() => setPage("signup")}>
                Signup
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold">Sign Up</h2>
            <input
              type="text"
              placeholder="Email"
              className="p-2 rounded-md bg-transparent border border-1 border-[rgba(119,119,125,0.2)] w-full h-[50px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 rounded-md bg-transparent border border-1 border-[rgba(119,119,125,0.2)] w-full h-[50px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-[#eb5d3a] border border-1 border-[rgba(119,119,125,0.2)] w-full h-[50px] text-[20px] rounded-md"
              onClick={handleSignup}
            >
              Sign Up
            </button>
            <p>
              If you already have an account?{" "}
              <span className="text-[#eb5d3a] cursor-pointer" onClick={() => setPage("login")}>
                Login
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
