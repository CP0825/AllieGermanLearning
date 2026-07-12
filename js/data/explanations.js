// js/data/explanations.js
// ---------------------------------------------------------------------------
// Plain-English grammar explanations. Two consumers:
//   • Each exercise shows a collapsible "How it works" panel (EXPLAIN[section]).
//   • The Grammar reference section (#grammar) lists GRAMMAR_ORDER, which also
//     includes reference-only topics that don't have their own drill yet
//     (Perfekt, adjective endings, negation, possessives, plurals, numbers).
//
// All copy is in English, aimed at an A1–A2 learner. Keep the HTML simple
// (p / ul / li / b / small table) so it styles cleanly everywhere.
// ---------------------------------------------------------------------------

export const EXPLAIN = {
  'der-die-das': {
    title: 'Articles & gender',
    emoji: '🇩🇪',
    html: `
      <p>Every German noun has a <b>gender</b>: <b>der</b> (masculine), <b>die</b> (feminine)
      or <b>das</b> (neuter). In the plural, the article is always <b>die</b>.</p>
      <p>Gender is <b>grammatical, not logical</b> — you can't reason it out. <i>das Mädchen</i>
      ("the girl") is neuter. So always learn a noun <b>together with its article</b>:
      not "Tisch" but <i>der Tisch</i>.</p>
      <p>A few endings are reliable hints:</p>
      <ul>
        <li><b>die</b>: words ending in <i>-ung, -heit, -keit, -schaft, -tion, -ei</i>
          (die Zeitung, die Freiheit, die Nation)</li>
        <li><b>das</b>: <i>-chen, -lein</i> (small things), and most <i>-um</i>
          (das Mädchen, das Zentrum)</li>
        <li><b>der</b>: days, months, seasons, most weather (der Montag, der Sommer, der Regen)</li>
      </ul>
      <p>The article also <b>changes with the case</b> (its job in the sentence) — that's the
      next topic, Cases.</p>`,
  },

  cases: {
    title: 'The four cases',
    emoji: '📦',
    html: `
      <p>A "case" is the <b>job a noun does</b> in the sentence. The job changes the article
      (and sometimes adds an ending). German has four:</p>
      <ul>
        <li><b>Nominativ</b> — the <b>subject</b> (who/what does the action):
          <i>Der Mann liest.</i></li>
        <li><b>Akkusativ</b> — the <b>direct object</b> (who/what receives the action):
          <i>Ich sehe <b>den</b> Mann.</i> Only the masculine changes (der→den, ein→einen);
          die / das / plural look the same as the Nominativ.</li>
        <li><b>Dativ</b> — the <b>indirect object</b> (to/for whom), plus after certain
          prepositions and verbs: <i>Ich gebe <b>dem</b> Mann das Buch.</i></li>
        <li><b>Genitiv</b> — <b>possession</b> (whose): <i>das Auto <b>des</b> Mannes.</i>
          More formal; spoken German often uses <i>von + Dativ</i> instead.</li>
      </ul>
      <p>The definite article across the cases:</p>
      <table class="gr-table">
        <tr><th></th><th>m</th><th>f</th><th>n</th><th>pl</th></tr>
        <tr><th>Nom</th><td>der</td><td>die</td><td>das</td><td>die</td></tr>
        <tr><th>Akk</th><td><b>den</b></td><td>die</td><td>das</td><td>die</td></tr>
        <tr><th>Dat</th><td>dem</td><td>der</td><td>dem</td><td>den&nbsp;+n</td></tr>
        <tr><th>Gen</th><td>des&nbsp;+s</td><td>der</td><td>des&nbsp;+s</td><td>der</td></tr>
      </table>
      <p><b>Dative triggers to memorise:</b> the prepositions <i>mit, nach, bei, seit, von, zu,
      aus</i> always take the Dativ, and so do the verbs <i>helfen, danken, gehören, gefallen,
      antworten</i>.</p>
      <p><b>Two-way prepositions</b> (<i>an, auf, in, über, unter, vor, hinter, neben, zwischen</i>)
      take the <b>Akkusativ for movement</b> (wohin? — where to?) and the <b>Dativ for location</b>
      (wo? — where?): <i>Ich gehe in <b>die</b> Schule</i> vs <i>Ich bin in <b>der</b> Schule.</i></p>`,
  },

  conjugate: {
    title: 'Present-tense verbs',
    emoji: '🔤',
    html: `
      <p>Regular verbs = <b>stem + ending</b>. Drop <i>-en</i> from the infinitive to get the
      stem, then add:</p>
      <table class="gr-table">
        <tr><th>ich</th><td>-e</td><th>wir</th><td>-en</td></tr>
        <tr><th>du</th><td>-st</td><th>ihr</th><td>-t</td></tr>
        <tr><th>er/sie/es</th><td>-t</td><th>sie/Sie</th><td>-en</td></tr>
      </table>
      <p><i>spielen → ich spiele, du spielst, er spielt, wir spielen, ihr spielt, sie spielen.</i></p>
      <ul>
        <li>Stems ending in <b>-t/-d</b> add a helper <b>-e</b>: <i>arbeiten → du arbeit<b>e</b>st</i>.</li>
        <li><b>Strong verbs</b> change their stem vowel in <b>du</b> and <b>er/sie/es</b>:
          <i>fahren → du f<b>ä</b>hrst</i>, <i>essen → du <b>i</b>sst</i>, <i>sehen → er s<b>ie</b>ht</i>.</li>
        <li><b>Modal verbs</b> (können, müssen, wollen…) are irregular, and the <b>ich</b> and
          <b>er</b> forms are identical: <i>ich kann, er kann</i>.</li>
        <li><b>Separable verbs</b>: the prefix jumps to the <b>end</b> of the clause:
          <i>aufstehen → ich stehe um 7 Uhr <b>auf</b></i>.</li>
        <li>The two you use constantly are irregular: <i>sein</i> (ich bin, du bist, er ist…) and
          <i>haben</i> (ich habe, du hast, er hat…).</li>
      </ul>`,
  },

  translate: {
    title: 'Translating sentences',
    emoji: '📝',
    html: `
      <p>This is <b>production</b> practice — you build the whole German sentence yourself, which
      is the fastest way to turn what you recognise into what you can actually say.</p>
      <ul>
        <li>Remember the <b>V2 rule</b> — the verb is the second idea (see Word order).</li>
        <li>Watch the <b>case</b> of the object (a direct object is Akkusativ) and <b>capitalise
          nouns</b>.</li>
        <li>Spelling is forgiving on case, punctuation and ä/ö/ü/ß (you can type <i>ae/oe/ue/ss</i>),
          but the <b>words and grammar</b> need to be right.</li>
        <li>There's often more than one correct answer — if yours is marked wrong, compare it with
          the model answer shown; it may just be a different valid phrasing.</li>
      </ul>`,
  },

  'fill-blank': {
    title: 'Filling the blank',
    emoji: '✍️',
    html: `
      <p>Type the missing German word to complete the sentence. Small typos are forgiven, but
      aim for the exact form.</p>
      <ul>
        <li><b>Capitalise nouns</b> — in German every noun starts with a capital letter
          (der <b>H</b>und, das <b>B</b>rot).</li>
        <li>You can type <b>ä ö ü ß</b> directly, or the spellings <i>ae oe ue ss</i>.</li>
        <li>The English translation is shown above to guide you; the full German sentence is
          read aloud after you answer.</li>
      </ul>`,
  },

  'word-choice': {
    title: 'Choosing the right word',
    emoji: '🎨',
    html: `
      <p>Pick the option that fits both the <b>meaning</b> and the <b>grammar</b> of the sentence.</p>
      <ul>
        <li>Check the <b>gender and case</b> — often the difference between options is der/den/dem.</li>
        <li>Watch for <b>false friends</b>: <i>bekommen</i> means "to receive", not "to become".</li>
        <li>Read the whole sentence first — the verb or a preposition usually decides the answer.</li>
      </ul>`,
  },

  'word-order': {
    title: 'Sentence structure',
    emoji: '🔀',
    html: `
      <p>The golden rule of a German statement: the <b>conjugated verb is always the second
      idea</b> (the "V2" rule).</p>
      <ul>
        <li><i><b>Ich</b> spiele heute Fußball.</i> — subject first.</li>
        <li><i><b>Heute</b> spiele ich Fußball.</i> — if something else goes first, the subject
          moves after the verb, but the verb stays in slot two.</li>
      </ul>
      <p>The middle of the sentence follows <b>Time – Manner – Place (TMP)</b>:
      <i>Ich fahre <b>morgen</b> (time) <b>mit dem Bus</b> (manner) <b>zur Schule</b> (place).</i></p>
      <ul>
        <li><b>Yes/no question</b>: verb first — <i>Spielst du Fußball?</i></li>
        <li><b>W-question</b>: question word + verb — <i>Wann kommst du?</i></li>
        <li><b>weil / dass / wenn</b> (subordinate clauses) send the verb to the <b>very end</b>:
          <i>…, weil ich müde <b>bin</b>.</i></li>
        <li>With a modal or the Perfekt, the <b>second verb</b> (infinitive or participle) goes to
          the end: <i>Ich <b>will</b> heute Fußball <b>spielen</b>.</i></li>
      </ul>`,
  },

  conversation: {
    title: 'Everyday phrases',
    emoji: '💬',
    html: `
      <p>These are ready-made phrases grouped by situation (greetings, shopping, the café…).</p>
      <ul>
        <li>Learn them as whole <b>chunks</b> you can reuse, not word by word.</li>
        <li>Tap the 🔊 to hear the natural rhythm and copy it out loud.</li>
      </ul>`,
  },

  flashcards: {
    title: 'How review works',
    emoji: '🃏',
    html: `
      <p>Flashcards use <b>spaced repetition</b>: cards you know well come back rarely, cards you
      struggle with come back often. That's the fastest way to move words into long-term memory.</p>
      <ul>
        <li>See the English, picture the German, tap to check, then rate yourself <b>honestly</b>.</li>
        <li><b>Again</b> = didn't know it (it comes back later in this session and again tomorrow).</li>
        <li><b>Good</b> = knew it. <b>Easy</b> = instant — it waits even longer before returning.</li>
        <li>A word counts as <b>mastered</b> once you've earned a 21-day gap on it.</li>
      </ul>
      <p>Each session shows the words that are <b>due</b> first, then introduces a few new ones.</p>`,
  },

  plurals: {
    title: 'Making plurals',
    emoji: '👥',
    html: `
      <p>German has <b>no single plural rule</b> — you learn the plural with the noun. But the
      common patterns are worth recognising (the plural article is always <b>die</b>):</p>
      <ul>
        <li><b>-e</b>, often with an umlaut: der Tisch → die Tisch<b>e</b>, der Stuhl → die St<b>ü</b>hle</li>
        <li><b>-er</b> (+ umlaut where possible): das Kind → die Kind<b>er</b>, das Haus → die H<b>äu</b>ser</li>
        <li><b>-(e)n</b> (most feminine nouns): die Frau → die Frau<b>en</b>, die Blume → die Blume<b>n</b></li>
        <li><b>-s</b> (many loanwords): das Auto → die Auto<b>s</b>, das Handy → die Handy<b>s</b></li>
        <li><b>no ending</b> (often -er/-en/-el words), sometimes umlaut: der Lehrer → die Lehrer,
          der Vater → die V<b>ä</b>ter</li>
      </ul>
      <p>In the <b>dative plural</b> the noun also takes an <b>-n</b>: <i>mit den Kinder<b>n</b></i>.</p>`,
  },

  'past-tense': {
    title: 'The past (Perfekt)',
    emoji: '⏪',
    html: `
      <p>For talking about the past in everyday German you use the <b>Perfekt</b>:
      <b>haben or sein</b> (conjugated) + the <b>past participle</b> at the <b>end</b> of the sentence.</p>
      <ul>
        <li><i>Ich <b>habe</b> Fußball <b>gespielt</b>.</i></li>
        <li><i>Ich <b>bin</b> nach Hause <b>gegangen</b>.</i></li>
      </ul>
      <p>The participle:</p>
      <ul>
        <li><b>Regular</b>: <i>ge- + stem + -t</i> → machen → <b>gemacht</b>, spielen → gespielt.</li>
        <li><b>Strong</b>: <i>ge- + stem + -en</i>, often with a vowel change → gehen → <b>gegangen</b>,
          sehen → gesehen, essen → gegessen.</li>
      </ul>
      <p>Use <b>sein</b> for verbs of <b>movement or change of state</b> (gehen, fahren, kommen,
      fliegen, aufstehen, werden, bleiben, sein); use <b>haben</b> for everything else.</p>
      <p>No <b>ge-</b> for verbs ending in <i>-ieren</i> (studiert) or with an inseparable prefix
      (verstanden, bekommen). Separable verbs put ge- <b>inside</b>: aufstehen → auf<b>ge</b>standen.</p>`,
  },
};

// Reference-only topics — no drill of their own yet, shown in the Grammar section.
export const EXPLAIN_REF = {
  'adjective-endings': {
    title: 'Adjective endings',
    emoji: '🎯',
    html: `
      <p>When an adjective sits <b>in front of a noun</b> it takes an ending. The ending depends on
      the article, gender and case — this is the trickiest part of A1–A2, so go gently.</p>
      <p><b>After der/die/das</b> (definite): mostly <b>-e</b> in the singular nominative, and
      <b>-en</b> almost everywhere else.</p>
      <ul>
        <li>der <b>große</b> Mann · die <b>große</b> Frau · das <b>große</b> Haus</li>
        <li>Akkusativ masculine and all plurals → <b>-en</b>: den <b>großen</b> Mann · die
          <b>großen</b> Häuser</li>
      </ul>
      <p><b>After ein/kein/mein</b> (indefinite): the adjective has to <b>show the gender</b> the
      little word can't:</p>
      <ul>
        <li>ein <b>großer</b> Mann · eine <b>große</b> Frau · ein <b>großes</b> Haus</li>
      </ul>
      <p><b>No article</b> at all: the adjective takes the article's own ending —
      <i>gut<b>er</b> Wein, kalt<b>es</b> Wasser, frisch<b>e</b> Milch</i>.</p>`,
  },
  negation: {
    title: 'Saying "no" (kein vs nicht)',
    emoji: '🚫',
    html: `
      <p>German has two ways to make something negative:</p>
      <ul>
        <li><b>kein</b> negates a noun that has <b>ein</b> or <b>no article</b>. It declines exactly
          like <i>ein</i>: <i>Ich habe <b>kein</b> Auto. Das ist <b>keine</b> gute Idee. Ich habe
          <b>keine</b> Zeit.</i></li>
        <li><b>nicht</b> negates a <b>verb, an adjective, or a specific noun</b> (one with
          der/die/das or a name): <i>Ich spiele <b>nicht</b>. Das ist <b>nicht</b> mein Auto. Der
          Kaffee ist <b>nicht</b> heiß.</i></li>
      </ul>
      <p>Position: <b>nicht</b> comes right before the word it negates, or at the end when it negates
      the whole action — <i>Ich kenne ihn <b>nicht</b>.</i></p>`,
  },
  possessives: {
    title: 'My, your, his… (possessives)',
    emoji: '👪',
    html: `
      <p>Possessive words say who something belongs to. They <b>decline like ein/kein</b>.</p>
      <table class="gr-table">
        <tr><th>mein</th><td>my</td><th>unser</th><td>our</td></tr>
        <tr><th>dein</th><td>your</td><th>euer</th><td>your (pl.)</td></tr>
        <tr><th>sein</th><td>his / its</td><th>ihr</th><td>her / their</td></tr>
        <tr><th>Ihr</th><td>your (formal)</td><td></td><td></td></tr>
      </table>
      <p>They agree with the <b>thing owned</b>, not the owner: <i><b>mein</b> Vater</i> (m),
      <i><b>meine</b> Mutter</i> (f), <i><b>mein</b> Kind</i> (n), <i><b>meine</b> Eltern</i> (pl).
      In the accusative the masculine adds -en: <i>Ich liebe <b>meinen</b> Vater.</i></p>`,
  },
  numbers: {
    title: 'Numbers 0–100',
    emoji: '🔢',
    html: `
      <p>0 <b>null</b>, 1 eins, 2 zwei, 3 drei, 4 vier, 5 fünf, 6 sechs, 7 sieben, 8 acht, 9 neun,
      10 zehn.</p>
      <p>11 elf, 12 zwölf, then 13–19 are <i>-zehn</i>: dreizehn, vierzehn… (watch 16 <b>sechzehn</b>,
      17 <b>siebzehn</b>).</p>
      <p>Tens: 20 zwanzig, 30 <b>dreißig</b>, 40 vierzig, 50 fünfzig, 60 sechzig, 70 siebzig,
      80 achtzig, 90 neunzig, 100 (ein)hundert.</p>
      <p>In between, German says the <b>units first</b>, joined with <i>und</i>, as <b>one word</b>:
      21 = <i>einundzwanzig</i> ("one-and-twenty"), 47 = <i>siebenundvierzig</i>.</p>`,
  },
};

// Order shown in the Grammar reference (#grammar).
export const GRAMMAR_ORDER = [
  'der-die-das',
  'plurals',
  'cases',
  'adjective-endings',
  'conjugate',
  'past-tense',
  'negation',
  'possessives',
  'word-order',
  'numbers',
];

// Look a topic up in either map.
export function explainTopic(key) {
  return EXPLAIN[key] || EXPLAIN_REF[key] || null;
}

// Collapsible "How it works" panel shown at the top of an exercise.
export function explainPanel(key, { open = false } = {}) {
  const t = EXPLAIN[key];
  if (!t) return '';
  return `
    <details class="ex-explain"${open ? ' open' : ''}>
      <summary><span class="ex-explain-ico">📖</span> How it works — ${t.title}</summary>
      <div class="ex-explain-body">${t.html}</div>
    </details>`;
}
