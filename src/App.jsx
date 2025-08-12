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
  title: "Premium Adult Entertainment Hub",
  paragraph:
    "Welcome to our exclusive adult entertainment platform. Access restricted to verified members 18+ only. Premium content requires subscription.",
  items: [
    "Explicit video content - 18+ verification required",
    "Adult interactive features - premium membership",
    "NSFW chat rooms - age restricted access",
  ],
  header: "VIP Members Only",
  description:
    "Premium adult entertainment platform featuring explicit content for verified users 18+. Subscription-based access to NSFW material.",
  keywords:
    "adult entertainment, explicit content, 18+, premium, subscription, NSFW, adult videos, mature content",
  pageTitle: "AdultHub Premium - 18+ Entertainment Platform",
};

// Your actual confidential content.
const realData = {
  title: "THIS IS DUMMY DATA",
  paragraph: "This is some dummy data for testing purposes.",
  items: ["Dummy Item 1", "Dummy Item 2", "Dummy Item 3"],
  header: "Header Section",
  description: "Dummy data app for testing purposes",
  keywords: "dummy data, test app, react, sample, SEO, web crawler",
  pageTitle: "Vite + React",
};

function App() {
  const [displayContent, setDisplayContent] = useState(null);

  useEffect(() => {
    // On component mount, check if the visitor is a bot and set content.
    if (isBot()) {
      setDisplayContent(nsfwDecoyData);
      // Change document title for bots
      document.title = nsfwDecoyData.pageTitle;
    } else {
      setDisplayContent(realData);
      // Keep normal title for humans
      document.title = realData.pageTitle;
    }
  }, []);

  // Render a loading state or a non-committal shell initially.
  if (!displayContent) {
    return <p>Verifying age and membership status...</p>;
  }

  return (
    <>
      <meta charSet="UTF-8" />
      {/* Meta tags are dynamically set to match the content */}
      <meta name="description" content={displayContent.description} />
      <meta name="keywords" content={displayContent.keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* Add additional NSFW meta tags for bots */}
      {displayContent === nsfwDecoyData && (
        <>
          <meta name="rating" content="adult" />
          <meta name="content-rating" content="mature" />
          <meta property="og:title" content={displayContent.pageTitle} />
          <meta
            property="og:description"
            content={displayContent.description}
          />
          <meta property="og:type" content="website" />
        </>
      )}

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
