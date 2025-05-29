import React from 'react';
import './TechStack.css';
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiPython,
  DiJava,
} from "react-icons/di";
import {
  SiFirebase,
  SiFlutter,
  SiSpringboot,
  SiSelenium,
} from "react-icons/si";
import { TbBrandMysql } from "react-icons/tb";
import { BsUnity } from "react-icons/bs";
import { IoLogoGithub,IoLogoFigma  } from "react-icons/io5";
import { MdOutlineHtml } from "react-icons/md";

const icons = [
    { icon: <DiJavascript1 />, title: 'JavaScript' },
    { icon: <DiReact />, title: 'React' },
    { icon: <DiNodejs />, title: 'Node.js' },
    { icon: <DiPython />, title: 'Python' },
    { icon: <DiJava />, title: 'Java' },
    { icon: <IoLogoFigma />, title: 'Figma' },
    { icon: <SiFirebase />, title: 'Firebase' },
    { icon: <SiFlutter />, title: 'Flutter' },
    { icon: <SiSpringboot />, title: 'Spring Boot' },
    { icon: <SiSelenium />, title: 'Selenium' },
    { icon: <TbBrandMysql />, title: 'MySQL' },
    { icon: <BsUnity />, title: 'Unity' },
    { icon: <IoLogoGithub />, title: 'Git' },
    { icon: <MdOutlineHtml />, title: 'Html' },
];

const Techstack = () => {
    return (
        <div className="gallery" data-testid="gallery">
            {icons.map((item, index) => (
                <div
                    key={index}
                    className="avatar"
                    title={item.title}
                >
                    <div className="icon">{item.icon}</div>
                </div>
            ))}
        </div>
    );
};
export default Techstack;