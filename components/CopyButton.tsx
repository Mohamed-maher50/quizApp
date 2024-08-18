"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ClapperboardIcon, Clipboard, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { ToastProps } from "./ui/toast";
const toastMessages = {
  failed: {
    title: "Failed to copy",
    description: "An error occurred while copying the room code",
    variant: "destructive",
  },
  success: {
    title: "Copied",
    description: "Room code copied successfully",
    variant: "default",
    duration: 3000,
    className: "bg-green-400",
    children: <ClipboardCheck />,
  },
};
const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  const handleOnCopy = async () => {
    setIsCopied(true);
    try {
      await navigator.clipboard.writeText(text);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      toast(toastMessages.success as ToastProps);
    } catch (error) {
      toast(toastMessages.failed as ToastProps);
      console.error("Error copying text to clipboard:", error);
    }
  };
  return (
    <Button
      variant={"outline"}
      onClick={handleOnCopy}
      disabled={isCopied}
      className={cn(
        "flex p-px px-1 mx-0  hover:text-green-600  h-fit cursor-pointer items-center",

        isCopied && "text-green-600"
      )}
    >
      {isCopied ? <ClipboardCheck size={19} /> : <Clipboard size={19} />}
    </Button>
  );
};

export default CopyButton;
