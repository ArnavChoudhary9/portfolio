const About = () => {
  return (
    <div id="about" className="flex items-center py-16 px-4 text-center h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="relative py-8 before:absolute before:left-0 before:right-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-gray-300 before:to-transparent after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-gray-300 after:to-transparent">
          
          <h1 className="text-4xl font-bold text-white mb-6">
            About Me
          </h1>
          
          <p className="text-lg text-white opacity-80 leading-relaxed">
            I'm Arnav Choudhary, an Applied Mechanics freshman at IIT Delhi. My current focus lies in developing Game engine with Ray-Tracing capabilities.
          </p>

          <div className='text-left mt-4'>
            <p className="text-lg text-white opacity-80 leading-relaxed">
              My toolkit spans three domains:
            </p>

            <ul className="list-disc space-y-4 pl-8">
              <li>
                <h3 className='opacity-80'>Graphics Programming</h3>
                <p className='opacity-60'>I design GPU-accelerated rendering pipelines and real-time visualization systems</p>
              </li>
              <li>
                <h3 className='opacity-80'>Game Engine Dev</h3>
                <p className='opacity-60'>I've created multiple Game engines with very complex architectures and detailed documentations</p>
              </li>
              <li>
                <h3 className='opacity-80'>Full Stack Web Dev</h3>
                <p className='opacity-60'>I've created multiple websites just like this one, using multiple frameworks including Next.js, React, Flask and Django</p>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;
