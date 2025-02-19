const Qualifications = () => {
  return (
    <div id="qualifications" className="flex items-center py-16 px-4 text-center h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="relative py-8 before:absolute before:left-0 before:right-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-gray-300 before:to-transparent after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-gray-300 after:to-transparent">

          <h1 className="text-4xl font-bold text-white mb-6">
            Qualifications
          </h1>

          <div className='text-left mt-4'>
            <h2 className="text-xl text-white opacity-90 leading-relaxed mr-10">
              Academics:
            </h2>

            <ul className="list-disc space-y-4 pl-8">
              <li>
                <h3 className='opacity-80'>X</h3>
                <p className='opacity-60'>Passed: 2022 | Grade: 90%</p>
              </li>
              <li>
                <h3 className='opacity-80'>XII</h3>
                <p className='opacity-60'>Passed: 2024 | Grade: 88.6%</p>
              </li>
              <li>
                <h3 className='opacity-80'>Graduation</h3>
                <p className='opacity-60'>Passed: 2024-Present | Grade: 7.067 (CGPA as of Feb-2025)</p>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Qualifications;
