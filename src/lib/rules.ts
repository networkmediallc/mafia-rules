export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "lead"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; title?: string; text: string }
  | { type: "roles"; items: { name: string; description: string; team: "mafia" | "citizen" }[] }
  | { type: "steps"; items: string[] };

export type SectionImage = {
  src: string;
  alt: string;
};

export type RuleSection = {
  id: string;
  title: string;
  menuLabel: string;
  eyebrow?: string;
  image: string;
  imageAlt: string;
  /** Extra photos shown alongside the primary image (stacked collage). */
  images?: SectionImage[];
  imagePosition?: "right" | "left" | "background" | "top";
  /** CSS object-position for the primary image crop, e.g. "25% 40%". */
  imageFocus?: string;
  /** Give the photo column more horizontal space on desktop. */
  mediaWide?: boolean;
  /** Show the “scroll for more” hint when this section overflows. */
  scrollHint?: boolean;
  blocks: ContentBlock[];
};

export const SECTIONS: RuleSection[] = [
  {
    id: "welcome",
    title: "Learn the Rules",
    menuLabel: "Welcome",
    eyebrow: "Mafia Club",
    image: "/images/hero.jpg",
    imageAlt: "Players at a Mafia Club game night",
    imagePosition: "background",
    blocks: [
      {
        type: "lead",
        text: "You have to read the rules before playing your first game.",
      },
      {
        type: "paragraph",
        text: "This guide walks you through how a night at the club works — from drawing seats to the final vote. Take it section by section. Use the menu anytime to jump ahead.",
      },
    ],
  },
  {
    id: "basics",
    title: "The Basics",
    menuLabel: "The Basics",
    eyebrow: "01",
    image: "/images/table.jpg",
    imageAlt: "Mafia Club logo and printed rules on the game table",
    imagePosition: "right",
    blocks: [
      {
        type: "lead",
        text: "The Citizens are the good guys. The Mafia are the bad guys.",
      },
      {
        type: "paragraph",
        text: "The Citizens win when they figure out who’s in the Mafia and vote them out. The Mafia wins when they blend in with the Citizens.",
      },
      {
        type: "callout",
        title: "It’s a team game",
        text: "Even if you personally get killed or banished, you win if your team wins. You might be alive at the end and still lose. The goal is not to stay alive — it’s to set your team up for victory.",
      },
    ],
  },
  {
    id: "setup",
    title: "Setting Up the Game",
    menuLabel: "Setting Up",
    eyebrow: "02",
    image: "/images/setup-ball.jpg",
    imageAlt: "Players drawing numbered balls for seating",
    images: [
      {
        src: "/images/setup-cup.jpg",
        alt: "A player checking their role cup in secret",
      },
    ],
    imagePosition: "left",
    blocks: [
      {
        type: "paragraph",
        text: "Ten players draw balls to determine where to sit. The Host, who runs the game, passes out cups. Look in the bottom to see your role.",
      },
      {
        type: "callout",
        title: "Keep it secret",
        text: "Hold the cup close to your body before tipping it up, and make sure nobody else can see inside. Don’t look at anyone else’s cup. If you accidentally see somebody’s role, tell the Host so he can mix up the cups and pass them out again.",
      },
      {
        type: "roles",
        items: [
          { name: "Mafia", description: "Bad guy", team: "mafia" },
          { name: "Don", description: "Head of the Mafia / bad guys", team: "mafia" },
          { name: "Citizen", description: "Good guys", team: "citizen" },
          {
            name: "Sheriff",
            description: "Leader of the good guys — checks for Mafia",
            team: "citizen",
          },
        ],
      },
      {
        type: "paragraph",
        text: "There are 2 Mafia (including the Don).",
      },
    ],
  },
  {
    id: "first-night",
    title: "The First Night",
    menuLabel: "First Night",
    eyebrow: "03",
    image: "/images/first-night.jpg",
    imageAlt: "Players with blindfolds during nighttime",
    imagePosition: "right",
    scrollHint: true,
    blocks: [
      {
        type: "steps",
        items: [
          "The Host announces “Nighttime!”",
          "All players put on blindfolds and earmuffs, and put their heads down. Players can’t talk, sing, or move.",
          "The Host plays music of his choice.",
          "“Mafia: wake up!” — The Mafia remove their blindfolds and look at each other. The Don steeples his fingers. (If he forgets, the Host will ask, “Who is the Don?”)",
          "“Mafia: go to sleep.” — The Mafia put their blindfolds back on and lower their heads.",
          "“Sheriff: wake up and accuse!” — The Sheriff removes his blindfold and points at another player. If he correctly identifies a Mafia member, the Host nods yes. If the Sheriff accuses a Citizen, the Host shakes his head no.",
          "“Sheriff go to sleep.” — The Sheriff puts on his blindfold and puts his head down.",
          "“Everybody wake up!”",
        ],
      },
      {
        type: "callout",
        title: "Important",
        text: "If the Sheriff correctly identifies a Mafia member, it does NOT mean that the Mafia member is dead. It only means the Sheriff knows their true identity.",
      },
    ],
  },
  {
    id: "first-day",
    title: "The First Day",
    menuLabel: "First Day",
    eyebrow: "04",
    image: "/images/first-day.jpg",
    imageAlt: "Players during daytime discussion",
    imagePosition: "left",
    blocks: [
      {
        type: "paragraph",
        text: "Everyone removes their masks and earmuffs. Beginning with Player One, each player has 20 seconds to share thoughts and suspicions.",
      },
      {
        type: "paragraph",
        text: "The purpose of these speeches is to tell the group who you think the Mafia is, and give evidence for your suspicions. If you’re one of the first to speak, you’ll have little evidence — do the best you can.",
      },
      {
        type: "quote",
        text: "Player Number Four keeps making signals with player number five. Maybe they are in the Mafia together.",
      },
      {
        type: "quote",
        text: "Whenever Player Number Nine is Mafia, she always puts her hand over her mouth, which she’s doing right now.",
      },
      {
        type: "paragraph",
        text: "After everyone has spoken, the Host announces “night time!”",
      },
    ],
  },
  {
    id: "second-night",
    title: "The Second Night",
    menuLabel: "Second Night",
    eyebrow: "05",
    image: "/images/second-night.jpg",
    imageAlt: "Players signaling with fingers during a night round",
    imageFocus: "22% 42%",
    imagePosition: "right",
    blocks: [
      {
        type: "steps",
        items: [
          "“Mafia, wake up and kill.” — The Mafia remove their blindfolds. Without talking, they pick a target by pointing. Mafia cannot kill themselves at night. The Don makes the final decision.",
          "“Mafia go to sleep.”",
          "“Sheriff: wake up and accuse!” — The Sheriff points at another player. If the Mafia killed the Sheriff overnight, the Sheriff gets no new information — the Host points at the Sheriff and makes a throat-cutting gesture.",
          "“Sheriff go to sleep.” Then: “Everybody wake up!”",
        ],
      },
      {
        type: "callout",
        title: "Why the Host keeps asking",
        text: "The Host’s Sheriff questions continue even when the Sheriff is eliminated, because the Host never does anything that would reveal the identities of killed players.",
      },
    ],
  },
  {
    id: "day-two",
    title: "Day Two",
    menuLabel: "Day Two",
    eyebrow: "06",
    image: "/images/gallery-2.jpg",
    imageAlt: "Daytime discussion around the table",
    imagePosition: "left",
    blocks: [
      {
        type: "paragraph",
        text: "The Host announces which player has been murdered via “slow acting poison.” That player will be the last to speak.",
      },
      {
        type: "paragraph",
        text: "In future rounds, right after players wake up, the murdered player speaks (for up to 40 seconds) and then leaves the table.",
      },
      {
        type: "callout",
        title: "Eliminated players",
        text: "Players that are killed or banished cannot talk to anyone still in the game. They cannot make faces, express frustration, or distract from the game. Like observers, they should step outside to talk.",
      },
      {
        type: "paragraph",
        text: "On Day 2, speeches start with Player Number Two. You share suspicions — and you can formally accuse a player by saying “I accuse Player Number X” or “I nominate Player Number X.” The Host replies “Accusation accepted.”",
      },
      {
        type: "paragraph",
        text: "The final speech goes to the poisoned player, who exits the table before the vote.",
      },
    ],
  },
  {
    id: "voting",
    title: "Voting",
    menuLabel: "Voting",
    eyebrow: "07",
    image: "/images/voting.jpg",
    imageAlt: "Players voting with paddles",
    imagePosition: "right",
    mediaWide: true,
    scrollHint: true,
    blocks: [
      {
        type: "list",
        items: [
          "You do not have to vote for a player you formally accuse.",
          "You can ask the Host to withdraw your accusation during your minute. The Host replies “withdrawn.”",
          "You cannot accuse or nominate yourself.",
          "You cannot accuse or nominate the victim of slow acting poison (and wouldn’t want to — the Mafia cannot kill themselves at night).",
          "If nobody is nominated, there is no vote and you move to nighttime. That helps the Mafia — so if you’re a Citizen, make sure at least one player is accused.",
          "If only one player is nominated, that player dies without a vote.",
          "If more than one player is nominated, you move to a vote.",
        ],
      },
      {
        type: "paragraph",
        text: "The Host reads the numbers of all accused players. Pick up your paddle and marker and write down who you want to vote out. You cannot vote against yourself. If you are Mafia, you can vote for the other Mafia member.",
      },
      {
        type: "callout",
        title: "Paddle etiquette",
        text: "Hold your paddle close to your chest. You cannot show other people your paddle before the vote, but you can hold up fingers indicating who you’re voting for — honestly or deceptively. After you flip, keep it close so everyone can see your vote.",
      },
      {
        type: "paragraph",
        text: "The Host says “Turn your paddles around!” If your number doesn’t match an accused player, or you write something else / nothing, your vote doesn’t count. The player with the most votes is eliminated. The Host does not reveal their secret role.",
      },
      {
        type: "paragraph",
        text: "On a tie, the top vote-getters get another 30 seconds to speak, then players vote again among only those options. If it ties again, both are eliminated.",
      },
    ],
  },
  {
    id: "exit-speech",
    title: "The Exit Speech",
    menuLabel: "Exit Speech",
    eyebrow: "08",
    image: "/images/gallery-6.jpg",
    imageAlt: "A player giving a farewell speech",
    imagePosition: "left",
    blocks: [
      {
        type: "paragraph",
        text: "The voted-out player has 40 seconds to speak.",
      },
      {
        type: "list",
        items: [
          "Citizen: Say you are a Citizen. Give your best guesses as to who is in the Mafia, plus any useful observations.",
          "Sheriff: Tell everyone you are the Sheriff. Say who you checked and how the Host responded. The Host can help — you just need to say you are the Sheriff. (A Mafia member might take a violation and pretend to be the real Sheriff.)",
          "Mafia: You have options. Keep pretending to be a Citizen. Pretend to be Sheriff and name players you supposedly accused. Or, if evidence is undeniable, admit you’re Mafia in a way that confuses Citizens about the other Mafia.",
        ],
      },
      {
        type: "quote",
        text: "You caught me! I’m a Mafia member, along with players Number 2 and 5.",
      },
      {
        type: "paragraph",
        text: "If you are the Don and get voted out, the other Mafia gets killing power.",
      },
    ],
  },
  {
    id: "end-game",
    title: "End of the Game",
    menuLabel: "End of Game",
    eyebrow: "09",
    image: "/images/end-game.jpg",
    imageAlt: "Celebration at the end of a game",
    imagePosition: "right",
    blocks: [
      {
        type: "lead",
        text: "The Citizens win when both Mafia members are voted out.",
      },
      {
        type: "paragraph",
        text: "The Mafia wins when there are an equal number of Mafia and Citizens.",
      },
    ],
  },
  {
    id: "etiquette",
    title: "Etiquette",
    menuLabel: "Etiquette",
    eyebrow: "10",
    image: "/images/etiquette.jpg",
    imageAlt: "Players gathered around the table",
    imagePosition: "left",
    scrollHint: true,
    blocks: [
      {
        type: "list",
        items: [
          "Don’t talk unless it’s your turn. Exasperations are ok.",
          "Don’t touch people, whether openly or secretly.",
          "Gestures are fine.",
          "You’re allowed to stop the game to ask a rules question, as long as you don’t reveal your secret role.",
          "You’re allowed to make one-liner jokes at any time — if they’re funny.",
          "Don’t bring outside forces into the game. No “I swear on my mother’s grave,” bribes, blackmail, or threats about the ride home.",
          "No bribery or blackmail. Don’t make threats. Be nice.",
        ],
      },
      {
        type: "callout",
        title: "Warnings",
        text: "When you violate a rule, you get a warning. Over 20 seconds → second warning. Over 40 → third. Over 60 → four. Three warnings: you lose the ability to speak (apart from rules questions). Four warnings: removed from the game. Often it’s good to take a warning if you have something urgent to say. The Host has discretion over enforcement.",
      },
    ],
  },
  {
    id: "tips-citizens",
    title: "Tips for Citizens",
    menuLabel: "Citizen Tips",
    eyebrow: "11",
    image: "/images/tips-citizens.jpg",
    imageAlt: "Citizens working together",
    imagePosition: "right",
    blocks: [
      {
        type: "list",
        items: [
          "Do not lie. A Citizen should never pretend to be the Mafia or Sheriff. Causing chaos for fun wastes everyone else’s night. The Host will identify a Citizen falsely claiming to be Mafia or Sheriff as a “Shameful Accomplice to the Mafia.” Two chaos-for-fun plays may result in suspension.",
          "The most important evidence is who people vote for. Mafia look to eliminate any Citizen; Citizens want to eliminate Mafia.",
          "If two people claim to be Sheriff, they are on opposite teams. Generally, kill both — one this round, one the next.",
        ],
      },
    ],
  },
  {
    id: "tips-mafia",
    title: "Tips for Mafia",
    menuLabel: "Mafia Tips",
    eyebrow: "12",
    image: "/images/tips-mafia.jpg",
    imageAlt: "A Mafia player reading the room",
    imagePosition: "left",
    blocks: [
      {
        type: "list",
        items: [
          "The best strategy often involves one Mafia member pretending to be the Sheriff.",
          "Get in the headspace of being a Citizen. Pretend to look for evidence that other Citizens are Mafia.",
          "Try to figure out who the Sheriff is and kill them at night so they can’t check more players. But if you kill them at night and they come out as Sheriff in their goodbye speech, do not claim to be the real Sheriff — only the real Sheriff can die at night.",
          "Generally kill the most innocent players. If there’s suspicion against someone, keep them alive so Citizens might vote them out.",
          "Generally kill off players the real Sheriff has cleared.",
          "Usually the Mafia should try to vote for the same person.",
        ],
      },
    ],
  },
  {
    id: "tips-sheriff",
    title: "Tips for Sheriff",
    menuLabel: "Sheriff Tips",
    eyebrow: "13",
    image: "/images/tips-sheriff.jpg",
    imageAlt: "The Sheriff weighing an accusation",
    imageFocus: "18% 28%",
    imagePosition: "right",
    blocks: [
      {
        type: "list",
        items: [
          "If you are voted out or killed at night, reveal that you are Sheriff in your exit speech and say who you checked and what the Host said.",
          "Early in the game, if you correctly guess a Mafia member at night, it’s usually best to sway the table toward voting for that person without explicitly revealing you are Sheriff. Offer other evidence of your suspicion instead.",
        ],
      },
      {
        type: "callout",
        title: "You’re ready",
        text: "That’s the full guide. When you sit down at the table, trust the Host, protect your cup, and play for your team.",
      },
    ],
  },
];
