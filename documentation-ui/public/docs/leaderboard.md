<!-- ## Leaderboard
---
Please find the leaderboard in this Google Sheet: <a href="https://docs.google.com/spreadsheets/d/12qG8JXyN3Ulra8vS-FGL717J_FovKiLrjEXPDCB8ApQ/edit?usp=sharing" 
   target="_blank" 
   rel="noopener noreferrer">
   https://docs.google.com/spreadsheets/d/12qG8JXyN3Ulra8vS-FGL717J_FovKiLrjEXPDCB8ApQ/edit?usp=sharing
</a>

Here is a screenshot of only the main metrics (all detailed metrics can be found in different tabs in the sheet shared above):

<iframe 
  src="https://docs.google.com/spreadsheets/d/12qG8JXyN3Ulra8vS-FGL717J_FovKiLrjEXPDCB8ApQ/preview" 
  width="100%" 
  height="700px" 
  frameborder="0">
</iframe> -->


// In your page/router file, wherever you handle slug → content
import Leaderboard from "../components/Leaderboard";

// When slug === "leaderboard", render the component directly
// instead of fetching a markdown file:
{slug === "leaderboard" ? (
  <Leaderboard />
) : (
  <MarkdownRenderer file={slugToFile[slug]} />
)}