import qr from "../assets/QR.jpg"

const Phonepay = () => {
  const total = localStorage.getItem("total");
  return (
    <div className='ml-8'>
      <div className='flex gap-2 items-center '>
        <h1>Here is your total amount to Pay</h1>
        <h1 className='font-semibold text-red-500'>₹{total}</h1>
      </div>
      <div>
        <h1>Please Scan the below QR and Pay the amount</h1>
        <img src={qr} alt="qr" className="w-40 h-40 "/>
      </div>
    </div>
  )
}

export default Phonepay
