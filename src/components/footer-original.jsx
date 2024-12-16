import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const selections = [
    {
        title: 'Solutions',
        items: ['Marketting', 'Analytics', 'Commerce', 'Data', 'Cloud']
    },
    {
        title: 'Support',
        items: ['Pricing', 'Documentaion', 'Guides', 'API', 'Status']
    },
    {
        title: 'Company',
        items: ['About', 'Blog', 'Jobs', 'Press', 'Partners']
    },
    {
        title: 'Legal',
        items: ['Claims', 'Privacy', 'Terms', 'Policies', 'Conditions']
    },
]

const items = [
    {
        name: 'Facebook',
        icon: FaFacebook,
        link: 'https://facebook.com/'
    },
    {
        name: 'Instagram',
        icon: FaInstagram,
        link: 'https://instagram.com/'
    },
    {
        name: 'Twitter',
        icon: FaTwitter,
        link: 'https://twitter.com/'
    },
]

export const FooterOriginal = () => {
    return(
        <div className="w-full bg-white py-16 px-4">
            {/* <div className="max-w-[1440px] mx-auto grid md:grid-cols-2">
                <h1>THIS IS A FOOTER FOR RIGHT-RENTAL.</h1>
            </div> */}
            {/* <div className="w-full mt-24 bg-slate-900 text-gray-300 py-y px-2"> */}
            <div className='max-w-full] bg-slate-900 text-gray-300 py-y px-2'>
                <div className="max-w-[1240] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8">
                {
                    selections.map((selection, index) => (
                        <div key={index}>
                            <h6 className="font-bold uppercase pt-2">{selection.title}</h6>
                            <ul>
                                {selection.items.map((item, i) => (
                                    <li key={i} className="py-1 text-gray-500 hover:text-white cursor-pointer">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                }
                <div className="col-span-2 pt-8 md:pt-2">
                    <p className="font-bold uppercase">
                        Subscribe to our newsletter
                    </p>
                    <p className="py-4">
                        The latest updates, articles and resources, sent to your inbox weekly.
                    </p>
                    <form className="flex flex-col sm:flex-row">
                        <input type="email" placeholder="Enter email address" className="w-full p-2 mr-4 rounded-md mb-4"/>
                        <button className="p-2 mb-4">Subscribe</button>
                    </form>
                </div>
                </div>
                <div className="flex flex-col max-w[1440px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500">
                    <p className="py-4">
                        2024 Byrt Tech Tips, LLC. All rights reserved.
                    </p>
                    <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
                        {
                            items.map((x, index) => {
                                return <x.icon key={index} className="hover:text-white cursor-pointer"/>
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}