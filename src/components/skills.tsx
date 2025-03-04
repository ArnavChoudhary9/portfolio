'use client'
import { useState, useEffect } from 'react';

interface CodeforcesResponse {
  result: [{
    rating: number;
    rank: string;
    maxRating: number;
  }];
}

const Skills = () => {
  const [data, setData] = useState<CodeforcesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch('https://codeforces.com/api/user.info?handles=arnavchoudhary.6969', {
      signal: controller.signal
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data: CodeforcesResponse) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) return <div>Loading Codeforces data...</div>;
  if (error) return <div>Error Loading Codeforces data</div>;

  return (
    <div id="skills" className="flex items-center py-16 px-4 text-center h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="relative py-8 before:absolute before:left-0 before:right-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-gray-300 before:to-transparent after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-gray-300 after:to-transparent">

          <h1 className="text-4xl font-bold text-white mb-6">
            Skills
          </h1>

          <div className='text-left mt-4'>
            <h2 className="text-xl text-white opacity-90 leading-relaxed mr-10">
              Programming:
            </h2>

            <ul className="list-disc space-y-4 pl-8">
              <li>
                <h3 className='opacity-80'>CodeForces</h3>
                <p className='opacity-60'>Rating: {data?.result[0].rating} | Rank: {data?.result[0].rank} | All-Time High: {data?.result[0].maxRating}</p>
              </li>
              <li>
                <h3 className='opacity-80'>Graphics</h3>
                <p className='opacity-60'>OpenGL | Vulken | ImGUI</p>
              </li>
              <li>
                <h3 className='opacity-80'>Programming Languages</h3>
                <p className='opacity-60'>Python | C/C++ | JavaScript/TypeScript | Rust | Assambly</p>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Skills;
