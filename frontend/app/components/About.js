import { Github, Linkedin } from 'lucide-react';

export default function About() {
  return (
    <main className="main-content flex justify-center items-start">
      {/* Updated the max-w to 'max-w-full' for mobile to take more space */}
      <div className="max-w-6xl sm:max-w-full w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="p-5 sm:p-10 h-[76vh] overflow-y-auto space-y-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 mb-3">About Us</h1>
            <p className="text-slate-600 text-md leading-relaxed">
              We&rsquo;re a bunch of students from the <strong>BS in Data Science program at IIT Madras</strong>.<br />
              After wrapping up our exams, we thought — <em>&quot;Why not build CricketGPT over the holidays?&quot;</em><br />
              <strong>Askcricket.ai</strong> is the result of a 4-day sprint by 3 of us. It&rsquo;s far from perfect, but it&rsquo;s our little experiment in learning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[ 
              {
                name: "AK Deepankar",
                role: "Frontend & UI",
                github: "https://github.com/akdeepankar",
                linkedin: "https://www.linkedin.com/in/akdeepankar"
              },
              {
                name: "Harshit Gunjal",
                role: "Backend & Gen AI",
                github: "https://github.com/HArsh-ri01",
                linkedin: "https://www.linkedin.com/in/harshit143/"
              },
              {
                name: "Jivraj Singh Shekhawat",
                role: "Backend & Gen AI",
                github: "https://github.com/jivraj-18",
                linkedin: "https://www.linkedin.com/in/jivraj-singh-shekhawat-92a547269/"
              },
            ].map((member, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center text-slate-600 shadow hover:shadow-lg transition-all duration-200 border border-slate-200 hover:scale-[1.02] transform"
              >
                <div className="text-base font-medium">{member.name}</div>
                <div className="text-sm text-slate-500 mb-2">{member.role}</div>
                <div className="flex space-x-4">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-black"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="text-slate-600 text-md leading-relaxed">
              <strong>IIT Madras</strong> supported us with cloud credits through a student innovation scholarship — 
              that&rsquo;s how we&rsquo;re keeping the GPT engine running (for now!).<br /><br />
              Feedback is always welcome — bugs, bloopers, or brilliant ideas — just hit us up.<br />
              <span className="italic">🚧 Expect flaws. We&rsquo;re students, not a startup (yet 😉).</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
