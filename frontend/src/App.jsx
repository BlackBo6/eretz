import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import SnackBar from "./components/SnackBar";
import { useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      recipient: "",
      subject: "",
      body: "",
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }, [open]);

  const handleSendEmail = async (data) => {
    setLoading(true);
    try {
      const { data: response } = await axios.post(
        "http://localhost:4000/api/email/send",
        {
          recipient: data.recipient,
          subject: data.subject,
          body: data.subject,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setStatus("success");
      setDescription("Email sent successfully");
      setTitle("Success");
      setOpen(true);
    } catch (err) {
      setStatus("error");
      setDescription("Something went wrong. Please try again later!");
      setTitle("Error");
      setOpen(true);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SnackBar
        status={status}
        description={description}
        open={open}
        title={title}
      />
      <form
        className="flex flex-col p-3 w-full shadow-md delay-150 justify-center items-center border rounded-md mx-2 gap-y-4 sm:w-full lg:w-1/3"
        onSubmit={handleSubmit(handleSendEmail)}
      >
        <input
          type="email"
          className="w-full p-1 border border-gray-200 rounded-md text-sm hover:border-gray-300 focus:border-blue-500"
          {...register("recipient", {
            required: {
              value: true,
              message: "Recipient is missed",
            },
            pattern: {
              value:
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
              message: "Invalid recipient",
            },
          })}
          placeholder="Recipient"
          required
        />
        {errors.recipient ? (
          <span className=" text-sm text-red-500 self-start">
            {errors.recipient.message}
          </span>
        ) : null}
        <input
          type="text"
          className="w-full p-1 border border-gray-200 text-sm rounded-md hover:border-gray-300 focus:border-blue-500"
          {...register("subject", {
            required: {
              value: true,
              message: "Subject should be provided",
            },
            minLength: {
              value: 3,
              message: "Subject should have more than 3 caracters",
            },
          })}
          placeholder="Subject"
        />
        {errors.subject ? (
          <span className=" text-sm text-red-500 self-start">
            {errors.subject.message}
          </span>
        ) : null}
        <textarea
          className="w-full p-1 border border-gray-200 text-sm rounded-md hover:border-gray-300 focus:border-blue-500"
          rows={5}
          {...register("body", {
            required: {
              value: true,
              message: "Body should be provided",
            },
          })}
          placeholder="Body"
          required
        />
        {errors.body ? (
          <span className=" text-sm text-red-500 self-start">
            {errors.body.message}
          </span>
        ) : null}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md delay-100 text-center flex justify-center items-center hover:bg-blue-600 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <div className=" animate-spin border-2 border-white w-6 h-6 rounded-full text-center"></div>
          ) : (
            "Send email"
          )}
        </button>
      </form>
    </div>
  );
}

export default App;
