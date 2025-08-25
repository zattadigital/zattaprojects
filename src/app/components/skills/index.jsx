const Skills = ({ locale, translations }) => {
  const t = translations?.skills || {};
  const skillsColumn1 = [
    {
      name: "Oracle Commerce Cloud(OCC)",
      percentage: 95,
    },
    {
      name: "Node.js/Express.js",
      percentage: 70,
    },

    {
      name: "React.js/Next.js",
      percentage: 90,
    },
    {
      name: "TypeScript",
      percentage: 70,
    },
    {
      name: "Jest/Testing Library",
      percentage: 70,
    },
    {
      name: "Redux",
      percentage: 80,
    },
    {
      name: "MySQL/PostgreSQL",
      percentage: 70,
    },

    {
      name: "AWS",
      percentage: 50,
    },
  ];

  const skillsColumn2 = [
    {
      name: "HTML",
      percentage: 100,
    },

    {
      name: "CSS",
      percentage: 90,
    },

    {
      name: "Javascript / ES6+",
      percentage: 80,
    },
    {
      name: "Figma",
      percentage: 80,
    },
    {
      name: "Agile/Scrum",
      percentage: 70,
    },

    {
      name: "CI/CD",
      percentage: 60,
    },

    {
      name: "Git",
      percentage: 90,
    },
  ];

  const skillLine = (skill) => {
    return (
      <div className="progress-charts" key={skill.name}>
        <h6 className="heading heading-h6">{skill.name}</h6>
        <div className="progress">
          <div
            className="progress-bar wow fadeInLeft"
            data-wow-duration="0.6s"
            data-wow-delay=".4s"
            role="progressbar"
            style={{
              width: `${skill.percentage}%`,
              visibility: "visible",
              animationDuration: "0.6s",
              animationDelay: "0.4s",
              animationName: "fadeInLeft",
            }}
            aria-valuenow={skill.percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span className="percent-label">{skill.percentage}%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="tmp-skill-area tmp-section-gapTop" id="skills">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6">
            <div className="progress-wrapper">
              <div className="content">
                <h2 className="custom-title mb--30 tmp-scroll-trigger tmp-fade-in animation-order-1">
                  {t.title}
                </h2>
                {/* Start Single Progress Charts */}
                {skillsColumn1.map((skill) => skillLine(skill))}
                {/* End Single Progress Charts */}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="progress-wrapper">
              <div className="content">
                <h2 className="custom-title mb--30 tmp-scroll-trigger tmp-fade-in animation-order-1">
                  {t.title}
                </h2>
                {/* Start Single Progress Charts */}
                {skillsColumn2.map((skill) => skillLine(skill))}
                {/* End Single Progress Charts */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Skills;
