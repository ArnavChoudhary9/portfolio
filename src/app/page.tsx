import About from '@/components/about';
import Qualifications from '@/components/qualifications';
import Skills from '@/components/skills';
import ProjectCards from '@/components/projectCards';

export default function Home() {
  return (
    <>
      <div className="h-screen" />
      <main className="relative z-[10] flex min-h-screen flex-col items-center justify-between px-4 py-16 md:px-12 lg:px-24">

        <About />
        <Qualifications />
        <Skills />
        <ProjectCards />

      </main >
    </>
  );
}
