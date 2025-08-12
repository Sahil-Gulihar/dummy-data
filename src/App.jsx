import { useState, useEffect } from "react";
import "./App.css";

// A list of substrings to identify known crawler user agents.
// This list requires ongoing maintenance.
const botUserAgents = [
  "googlebot",
  "bingbot",
  "slurp",
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "sogou",
  "exabot",
  "facebot",
  "ia_archiver",
  "GPTBot",
  "CCBot",
  "anthropic-ai",
  "ClaudeBot",
  "omgili",
  "omgilibot",
];

// Function to check the user agent on the client side.
const isBot = () => {
  if (typeof window !== "undefined") {
    const userAgent = navigator.userAgent.toLowerCase();
    return botUserAgents.some((bot) => userAgent.includes(bot));
  }
  return false;
};

// Misleading content to serve to bots.
const fakeData = {
  title: "A Study in Scarlet",
  paragraph: "by Arthur Conan Doyle (Public Domain)",
  items: [
    "Part 1: Being a Reprint from the Reminiscences of John H. Watson, M.D.",
    "Chapter 1: Mr. Sherlock Holmes.",
    "In the year 1878 I took my degree of Doctor of Medicine of the University of London...",
  ],
  header: "Public Domain Literature Analysis",
  description:
    "An analysis of classic public domain literature for educational purposes.",
  keywords:
    "literature, public domain, classic novel, sherlock holmes, analysis",
};

// Your actual confidential content.
const realData = {
  title: "THIS IS DUMMY DATA",
  paragraph: "This is some dummy data for testing purposes.",
  items: ["Dummy Item 1", "Dummy Item 2", "Dummy Item 3"],
  header: "Header Section",
  description: "Dummy data app for testing purposes",
  keywords: "dummy data, test app, react, sample, SEO, web crawler",
};

function App() {
  const [displayContent, setDisplayContent] = useState(null);

  useEffect(() => {
    // On component mount, check if the visitor is a bot and set content.
    if (isBot()) {
      setDisplayContent(fakeData);
    } else {
      setDisplayContent(realData);
    }
  }, []);

  // Render a loading state or a non-committal shell initially.
  if (!displayContent) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <meta charSet="UTF-8" />
      {/* Meta tags are dynamically set to match the content */}
      <meta name="description" content={displayContent.description} />
      <meta name="keywords" content={displayContent.keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <h1>{displayContent.title}</h1>
      <p>{displayContent.paragraph}</p>
      <ul>
        {displayContent.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <header>
        <h2>{displayContent.header}</h2>
      </header>
    </>
  );
}

export default App;
