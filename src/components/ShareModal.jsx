import React from 'react';
import {FaTelegram, FaWhatsapp, FaFacebookF, FaTimes, FaRegCopy } from 'react-icons/fa';
import { TwitterShareButton, TwitterIcon, TelegramShareButton, FacebookShareButton,WhatsappShareButton,FacebookIcon,WhatsappIcon,TelegramIcon } from 'react-share';
import toast from 'react-hot-toast';

const ShareModal = ({ isOpen, onClose, pasteId }) => {
  const shareLink = `https://www.codehelp.in/pastes/${pasteId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied to clipboard!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#1c1c1c] text-white rounded-lg p-6 w-[90%] max-w-md relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300">
          <FaTimes size={18} />
        </button>

        <h2 className="text-lg font-semibold mb-1">Share link</h2>
        <p className="text-sm text-gray-400 mb-4">Anyone who has this link will be able to view this.</p>

        {/* Link + Copy */}
        <div className="flex bg-[#2a2a2a] p-2 rounded-md mb-4 items-center justify-between">
          <input value={shareLink} readOnly className="bg-transparent text-white w-full outline-none" />
          <button onClick={copyToClipboard} className="ml-2 p-1 hover:bg-[#3a3a3a] rounded">
            <FaRegCopy />
          </button>
        </div>

        {/* Icons */}
        <div className="flex justify-around mt-4">
          <TwitterShareButton url={shareLink}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>

          <TelegramShareButton url={shareLink}>
            <TelegramIcon size={40} round />
          </TelegramShareButton>

          <WhatsappShareButton url={shareLink}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>

          <FacebookShareButton url={shareLink}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
