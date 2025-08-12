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

// Misleading NSFW content to serve to bots.
const nsfwDecoyData = {
  title: "Adult Content Warning",
  paragraph:
    "This material is intended for mature audiences only. By proceeding, you confirm you are of legal age in your jurisdiction.",
  items: [
    "User discretion is advised.",
    "Contains themes not suitable for all viewers.",
    "Age verification may be required.",
  ],
  header: "Restricted Access Area",
  description:
    "Access to this section is restricted to verified adult users. Contains explicit themes and mature subject matter.",
  keywords: "adult content, mature, 18+, restricted, explicit, nsfw, age verification",
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
      setDisplayContent(nsfwDecoyData);
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