export function AboutUs() {
    return (
      <div className="mx-28 flex flex-col items-center gap-10">
       
        <div className="flex flex-col items-center gap-6 mb-4">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className=" text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae alias, laborum accusantium 
            consequuntur modi amet nemo corrupti labore, praesentium voluptatibus sint, maxime dignissimos 
            expedita ipsum libero odio fugit quae. Perferendis! Maiores consequuntur in natus tenetur 
            quibusdam labore, autem magni dolor dignissimos et ullam eveniet animi incidunt ipsum illum 
            quidem sunt ab nemo voluptate enim ut fuga nam ex? Sint, impedit. Harum aliquid consequatur, 
            dolor saepe accusamus porro aspernatur consectetur dignissimos error vel? Voluptatem ipsa, 
            repellat nulla ad, est harum exercitationem, minus sunt cupiditate aspernatur ab sequi 
            praesentium nobis repudiandae eveniet.
          </p>
        </div>
  
       
        <div className="flex flex-col items-center gap-6 mb-4">
          <h2 className="text-3xl font-bold">Our Achievements</h2>
          <p className=" text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae alias, laborum accusantium 
            consequuntur modi amet nemo corrupti labore, praesentium voluptatibus sint, maxime dignissimos 
            expedita ipsum libero odio fugit quae. Perferendis! Maiores consequuntur in natus tenetur 
            quibusdam labore, autem magni dolor dignissimos et ullam eveniet animi incidunt ipsum illum 
            quidem sunt ab nemo voluptate enim ut fuga nam ex? Sint, impedit. Harum aliquid consequatur, 
            dolor saepe accusamus porro aspernatur consectetur dignissimos error vel?
          </p>
        </div>
  
    
        <div className="flex flex-col items-center gap-6 mb-4 w-full">
          <h2 className="text-3xl font-bold">Contact Information</h2>
          <div className="flex gap-20 w-full justify-center">
            <iframe
              className="w-full md:w-2/5 h-64 md:h-96 rounded-lg shadow-md"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.0888595582396!2d77.22116!3d28.657057899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfdf8165419b5%3A0x2356f5f4c8f0110b!2sGandhi%20Achar6Ranga!5e0!3m2!1sen!2sin!4v1727383077665!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="text-gray-700">
              <p className="mb-2">For queries related to orders:</p>
              <p className="mb-2">
                Drop us an email at <a href="mailto:achar6ranga.query@gmail.com" className="text-blue-600 underline">achar6ranga.query@gmail.com</a>
              </p>
              <p>
                Or call us at <span className="font-semibold">+91-9810148950 / +91-9910913737</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  