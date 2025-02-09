// import React from 'react'
// import copyright from "../assets/copyright.png"

const Footer = () => {

  return (
    <>
        <div>
            <div className="bg-black grid grid-cols-6 gap-2 font-semibold px-20">
                <div className="flex flex-col text-xs bg-black p-4">
                    <h6 className="pb-3 text-gray-400">ABOUT</h6>
                    <a href="" className="text-white">Contact Us</a>
                    <a href="" className="text-white">About Us</a>
                    <a href="" className="text-white">Careers</a>
                    <a href="" className="text-white">Flipkart Stories</a>
                    <a href="" className="text-white">Press</a>
                    <a href="" className="text-white">Corporate Information</a>
                </div>
                <div className="flex flex-col text-xs bg-black p-4">
                    <h6 className="pb-3 text-gray-400">GROUP COMPANIES</h6>
                    <a href="" className="text-white">Myntra</a>
                    <a href="" className="text-white">Shopsy</a>
                    <a href="" className="text-white">Cleartrip</a>
                </div>
                <div className="flex flex-col text-xs bg-black p-4">
                    <h6 className="pb-3 text-gray-400">HELP</h6>
                    <a href="" className="text-white">Payment</a>
                    <a href="" className="text-white">Shipping</a>
                    <a href="" className="text-white">Cancellation & Returns</a>
                    <a href="" className="text-white">FAQ</a>
                </div>  
                <div className="flex flex-col text-xs bg-black p-4">
                    <h6 className="pb-3 text-gray-400">CONSUMER POLICY</h6>
                    <a href="" className="text-white">Cancellation & Returns</a>
                    <a href="" className="text-white">Terms of Use</a>
                    <a href="" className="text-white">Security</a>
                    <a href="" className="text-white">Privacy</a>
                    <a href="" className="text-white">Sitemap</a>
                    <a href="" className="text-white">EPR Compilance</a>
                </div> 
                <div className="text-white p-4 text-xs">
                    <h6 className="pb-3 text-gray-400">Mail Us:</h6>
                    <p>
                        Flipkart Internet Private Limited,<br/> 
                        Buildings Alyssa, Begonia & Clove Embassy Tech Village, <br/>
                        Outer Ring Road, Devarabeesanahalli Village, <br/>
                        Bengaluru, 560103, <br/>
                        Karnataka,India
                    </p>
                </div>
                <div className="text-white p-4 text-xs">
                    <h6 className="pb-3 text-gray-400">Refistered Office Address</h6>
                    <p>
                        Flipkart Internet Private Limited,<br/>
                        Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br/>
                        Outer Ring Road, Devarabeesanahalli Village,<br/>
                        Bengaluru, 560103, Karnataka, India<br/>
                        CIN: U51109KA2012PTC066107<br/>
                        Telephone: <span className="text-blue-400 cursor-pointer">044-45614700<span className="text-white">/</span>044-67415800
                            </span>
                    </p>
                </div>         
            </div>
            <div className="flex text-white bg-black text-sm justify-center gap-20 p-3">
                <a href="" className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                </svg>
                    Become a Seller
                </a>
                <a href="" className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                    Advertise
                </a>
                <a href="" className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
                    Gift Cards
                </a>
                <a href="" className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
                    Help Center
                </a>
                <h6 className="text-white">
                &copy; 2007-2025 Flipkart.com</h6>
            </div>
        </div>
    </>
  )
}

export default Footer
