import React, { useState, useRef, useEffect } from "react";
import { LiaKeySolid } from "react-icons/lia";
import { MdForwardToInbox } from "react-icons/md";
import { ButtonSquare } from "../components/ui/buttonSquare";
import google from "../assets/google.png";
import facebook from "../assets/fb.png";
import signup from "../assets/SignUp.png";
import resetPassword from "../assets/reset.png";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

const OTP = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const inputRefs = useRef([]);
  const { id, email } = useParams();

  console.log(id, "id", "email", email)
  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Resend OTP function
  const handleResendOTP = () => {
    setTimeLeft(30);
    setIsTimerActive(true);
    setOtpValues(["", "", "", ""]);
    inputRefs.current[0]?.focus();
    // Add your resend OTP logic here
    console.log("Resending OTP...");
  };

  // Focus next input when current input has a value
  const focusNextInput = (currentIndex, value) => {
    if (value.length === 0) {
      // If current input is empty, focus previous input
      if (currentIndex > 0) {
        inputRefs.current[currentIndex - 1]?.focus();
      }
    } else {
      // If current input has value, focus next input
      if (currentIndex < otpValues.length - 1) {
        inputRefs.current[currentIndex + 1]?.focus();
      }
    }
  };

  // Handle input change
  const handleInputChange = (index, value) => {
    // Only allow single digit
    const digit = value.replace(/\D/g, "").slice(0, 1);

    const newOtpValues = [...otpValues];
    newOtpValues[index] = digit;
    setOtpValues(newOtpValues);

    // Focus next input if value is entered
    if (digit) {
      focusNextInput(index, digit);
    }
  };

  // Handle key down events
  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < otpValues.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = (e.clipboardData || window.clipboardData).getData("text");
    const digits = pasteData.replace(/\D/g, ""); // Only take numbers from the pasted data

    // Create new OTP values array
    const newOtpValues = [...otpValues];

    // Fill inputs with pasted digits
    for (let i = 0; i < Math.min(digits.length, otpValues.length); i++) {
      newOtpValues[i] = digits[i];
    }

    setOtpValues(newOtpValues);

    // Focus the next empty input or the last filled input
    const nextEmptyIndex = newOtpValues.findIndex((val) => val === "");
    const focusIndex =
      nextEmptyIndex !== -1
        ? nextEmptyIndex
        : Math.min(digits.length - 1, otpValues.length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  // Get the complete OTP value
  const getOtpValue = () => {
    return otpValues.join("");
  };

  // Check if OTP is complete
  const isOtpComplete = () => {
    return otpValues.every((value) => value !== "");
  };
  return (
    <div className="bg-background">
      <div className="flex flex-col md:flex-row 2xl:gap-x-[140px] gap-x-[30px] mx-0 px-0">
        <div className="w-full md:w-1/2 xl:w-1/3 md:py-[170px] py-[60px] px-[1rem] sm:px-[20px] md:pl-[60px] xl:pl-[120px] flex flex-col gap-10 justify-center">
          <h1 className="text-[30px] font-bold font-manrope text-black text-center sm:text-left">
            Verify Pin{" "}
          </h1>

          <form
            className="flex flex-col gap-8"
            onSubmit={(e) => {
              e.preventDefault();
              if (isOtpComplete()) {
                console.log("OTP Value:", getOtpValue());
                // Handle OTP verification here
              }
            }}
          >
            <div className="flex  justify-between items-center gap-6">
              <div className="flex gap-4 items-center">
                {otpValues.map((value, index) => (
                  <div key={index}>
                    <label htmlFor={`code-${index + 1}`} className="sr-only">
                      {index === 0
                        ? "First"
                        : index === 1
                          ? "Second"
                          : index === 2
                            ? "Third"
                            : "Fourth"}{" "}
                      code
                    </label>
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      id={`code-${index + 1}`}
                      value={value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="block w-9 h-9 py-3 text-sm font-extrabold text-center border border-brown-A43 rounded-lg bg-transparent"
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-end">
                <p
                  className={`text-[16px] font-poppins font-medium ${timeLeft === 0 ? "text-red-500" : "text-black"
                    }`}
                >
                  {formatTime(timeLeft)}
                </p>
              </div>
            </div>

            <Link to={"/resetPassword"}>
              <ButtonSquare
                type="submit"
                className={`w-full p-[20px] font-extrabold text-[14px] font-manrope ${isOtpComplete()
                  ? "bg-brown-A43 text-background"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                variant="secondary"
                disabled={!isOtpComplete()}
              >
                {isOtpComplete() ? "Verify Code" : "Enter 4-digit code"}
              </ButtonSquare>
            </Link>
          </form>

          <div className="inline-flex items-center justify-center w-full relative ">
            <hr className="w-[99%] h-1 bg-blueEC border-0 rounded-sm  " />
            <div className="absolute px-6 my-3 -translate-x-1/2     left-1/2  right-1/2 mx-2  bg-background flex justify-center items-center  ">
              <p className="text-blueCD text-[14px] font-manrope">or</p>
            </div>
          </div>

          <div className="flex flex-col    gap-[10px]">
            {timeLeft === 0 && (
              <div
                type="button"
                onClick={handleResendOTP}
                className="text-brown-A43 text-[14px] font-poppins font-medium   flex gap-2 items-center"
              >
                <p className="text-blueB8 text-[15px] font-poppins font-semibold">
                  Didn't receive the code?{" "}
                </p>{" "}
                <p className="hover:-translate-y-[2px] text-brown-A43 font-semibold font-poppins cursor-pointer">
                  Resend Code
                </p>
              </div>
            )}
            <div className="flex gap-[6px] justify-center items-center">
              <p className="text-blueB8 text-[15px] font-poppins font-semibold">
                Don't have an account?{" "}
                <Link
                  to="/signup-client"
                  className="hover:-translate-y-[2px] text-brown-A43 font-semibold font-poppins"
                >
                  SignIn
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div
          className="w-full md:w-1/2 xl:w-2/3 hidden md:block"
          style={{
            backgroundImage: `url(${resetPassword})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* <div className='w-full h-full'  >
                        <img src={signup} className='w-auto h-full object-fill'></img>
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default OTP;
