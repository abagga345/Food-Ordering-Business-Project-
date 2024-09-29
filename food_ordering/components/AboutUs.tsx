import { MapPinHouse, Mail, Phone } from 'lucide-react';

export function AboutUs() {
  return (
    <div className="mx-28 flex flex-col gap-10 mb-32 mt-20">

      <div className="flex mb-20 gap-32 p-16 rounded-lg">
        <div className="w-[50%] flex flex-col gap-6">
          <h2 className="text-4xl font-bold">Our Story</h2>
          <p className=" text-gray-600 text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae alias, laborum accusantium
            consequuntur modi amet nemo corrupti labore, praesentium voluptatibus sint, maxime dignissimos
            expedita ipsum libero odio fugit quae. <br /><br /> Perferendis! Maiores consequuntur in natus tenetur
            quibusdam labore, autem magni dolor dignissimos et ullam eveniet animi incidunt ipsum illum
            quidem sunt ab nemo voluptate enim ut fuga
          </p>
        </div>
        <img className="w-[50%] rounded-lg" src="https://www.farmdidi.com/cdn/shop/articles/Mango-Pickle-Blog-tile_1445x.webp?v=1670990749" alt="" />
      </div>

      <div className="flex flex-row-reverse mb-20 gap-32 p-16 rounded-lg">
        <div className="w-[50%] flex flex-col gap-6">
          <h2 className="text-4xl font-bold">Our Achievements</h2>
          <p className=" text-gray-600 text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae alias, laborum accusantium
            consequuntur modi amet nemo corrupti labore, praesentium voluptatibus sint, maxime dignissimos
            expedita ipsum libero odio fugit quae. <br /><br /> Perferendis! Maiores consequuntur in natus tenetur
            quibusdam labore, autem magni dolor dignissimos et ullam eveniet animi incidunt ipsum illum
            quidem sunt ab nemo voluptate enim ut fuga
          </p>
        </div>
        <img className="w-[50%] rounded-lg" src="https://media.assettype.com/homegrown%2Fimport%2Fbook%2F12241-qzhkgpfhew-1595237364.jpeg" alt="" />
      </div>

      <div className="flex justify-between mb-20 gap-20 p-16 rounded-lg items-center">
        <div className="text-lg">
          <h2 className="text-4xl font-bold mb-10">Contact Information</h2>
          <div className='mb-10'>
            <span className="font-semibold mb-4 flex items-center">
              <MapPinHouse className='inline me-2' />
              <p>Address</p>
            </span>
            <p>
              Shop No, 6675, Khari Baoli Rd, <br /> Fatehpuri, Chandni Chowk, New Delhi, Delhi, 110006
            </p>
          </div>

          <div className='mb-10'>
            <span className='font-semibold mb-4 flex items-center'>
              <Mail className='inline me-2' />
              <p>Email</p>
            </span>
            <p className="mb-2">
              Drop us an email at <a href="mailto:achar6ranga.query@gmail.com" className="text-blue-600">achar6ranga.query@gmail.com</a>
            </p>
          </div>
          
          <div className='mb-10'>
            <span className='font-semibold mb-4 flex items-center'>
              <Phone className='inline me-2' />
              Phone
            </span>
            <p className='mb-2'>
              Call us at <span className="font-semibold">+91-9810148950 / +91-9910913737</span>
            </p>
          </div>
        </div>

        <iframe
          className="w-full md:w-2/5 h-64 md:h-96 rounded-lg shadow-md"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.0888595582396!2d77.22116!3d28.657057899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfdf8165419b5%3A0x2356f5f4c8f0110b!2sGandhi%20Achar6Ranga!5e0!3m2!1sen!2sin!4v1727383077665!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}