export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col items-center w-full h-20 bg-gray-500 flex-shrink-0">
      <p className="my-4">
        © {currentYear} QR KUNDALI. All rights reserved.
        <span className="flex justify-center items-center">
          Developer Bhoraj Malla
        </span>
      </p>
    </div>
  );
}
