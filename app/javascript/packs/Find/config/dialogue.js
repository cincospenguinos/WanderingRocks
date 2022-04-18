const andre = [
	"Hey! You found me!",
	"I know that putting myself in the game is, like, way too much meta,",
	"but I thought it would be a fun way to talk to you, the player, directly.",
	"I worry that I come across as a grouchy know-it-all in class. The fears surrounding that",
	"perception don't come from anything anyone has said--instead, they come from countless",
	"years of emotional trauma.",
	"No, I won't burden you with all that information. Just know that it's there.",
	"I've mentioned before that I speak French. I really wish I could say that it was due to",
	"my name, that I learned from my parents or something, but nope, I learned French from",
	"an LDS mission in the Congo.",
	"I actually spent most of my time in Cameroon, which is why I have a bit",
	"of a Cameroonian accent when I speak.",
	"I also use their same idioms for things--like \"on fait kongosa jusqu'a.\"",
	"Stuff like that.",
	"I think that makes it a lot of fun, but it's a little odd to the Parisian folks I've met.",
	"Before my mission I was actually a music composition student. I wanted to be a composer.",
	"I wrote a variety of things back then, none of which was very good,",
	"but I was honing my craft!",
	"That's the only reason I know what I know about 20th century music. I took theory classes",
	"and composition classes that were focused on developing compositions in that style.",
	"I made my own matrices of twelve tones and used them as source material for my work.",
	"I also adopted Schoenberg's method of atonal music before the serialist approach, wherein",
	"you select two augmented triads that are a half-step apart, and use that as your scale.",
	"The fun with that is that you make something that has no tonal center, but has the asymmetric",
	"quality of a traditional scale to write melodies from.",
	"Lately what I've written tends to be very modal and very Medieval. I love the sound of those",
	"old chants, and I've wanted to bring back that style with a looser feel.",
	"Most of the music I end up composing is less something you'd sit and hear in an operahouse",
	"and more something you'd hear in a videogame.",
	"I wrote the music for this game in an afternoon, simply establishing a pattern that a",
	"careful listener will be able to pick out, but let it just float and end abruptly.",
	"I was looking to make something that feels the way _Tender Buttons_ felt to me--",
	"the sensation of an order you can sense is there, but is outside the reach of understanding.",
	"Hence this game is a collage of several ideas pulled from several of our texts thrown",
	"together in a way that satisfies my own goofy sense of humor.",
	"And that's what this game is really about: the humor of the opaque.",
	"I've found the modernists this time around to be really fun and playful. I think Joyce,",
	"Woolf, Faulkner, Kafka, and Stein weren't trying to gratify their pride as much as just",
	"make new and interesting things for others to enjoy.",
	"The ways that they engaged directly with issues of language and meaning and",
	"class and reason were, to me, too important to take seriously.",
	"They were all brilliant, but their brilliance was doing something new in a childlike way.",
	"It's all so beautiful to me.",
	"It makes me feel less alone in this world.",
	"That's also why I make weird stuff like this too: it makes me feel less alone in this world.",
	"I've made a couple of other games that you could go out and play.",
	"One of them in particular was highly praised by a random guy on YouTube, and one of my other",
	"classmates had played it through that random guy.",
	"As much as I wish that I could say it was all my game, it was a team effort by me and my",
	"buddy Han Han (if you're in my other class with me, you've heard a lot about Han Han.)",
	"Regardless, it was a neat experience, and I'll periodically dabble with this game dev stuff.",
	"Making games is, like, really really hard. Oddly enough the most challenging part for me",
	"is the design portion of the game.",
	"I can write code like it's nobody's business, and there are enough free or cheap assets",
	"out there that I can use or adapt, and I can make music and do sound design just fine,",
	"but game design is a whole other set of skills and tools way outside my wheelhouse.",
	"My buddy Han Han is all self-taught in that department, and I love the stuff he makes.",
	"He makes these really fun off-beat games about nature and man's relationship to nature",
	"that I love to play and tinker around with. You should check out his game Mito! It's here:",
	"https://hellochar.itch.io/mito",
	"Anyway, thanks for reading my rambling thoughts. Not many folks I know want to listen.",
	"Also, before I forget,",
	"1337 is the solution to one of the puzzles.",
	"At the time of writing this, there aren't any puzzles, but we'll see what I can churn",
	"out in the next... 15 hours? Wow, is that all the time I have?",
	"This really is a game dev project!",
	"Please enjoy _Find!_.",
];

const joyce = [
	'Guehehehehe...',
	'Arse full of farts...',
	'hehehehe.......',
];

const falkner = [// Yeah, I know I misspelled his name. Shut up.
	'Why is everyone murdering their children!?',
	"That's not what I said!",
];

const stein = [
	'If I told him...'
];

const grendel = [
	'The dragon put a charm on me: no weapon can cut me.',
	'I can walk up to the meadhall whenever I please, and they are powerless.',
	'My heart has grown dark because of that.',
	"I'm invulnerable, and now as solitary as one tree in a vast landscape of coal.",
	'I misunderstood: I thought it an advantage.',
];

const missionary = [
	"Bonjour! Je voudrais partager mon temoinage de la veracite de l'Evangile de Jesus Christ,",
	"l'Evangile revelee a travers son prophet, Joseph Smith, qui a acquiee quelques plaques d'or.",
	"Ces plaques d'or etaient tres important pour les Mormons (ou, comme nous disons maintenant,",
	"les membres de l'Eglise de Jesus Christ des Saints des Dernier Jours, parce que notre prophet",
	"qui nous dirige aujourd'hui nous a dit que c'est mauvais utilise les noms il n'aime pas).",
	"Est-ce que j'ai dit que les plaques d'or sont important pour les Mormons? Je me trompe.",
	"Les plaques d'or sont important pour tout le monde, meme vous, si vous ecoutez.",
	"Mon message vient de ces plaques d'or, parce que mes parents m'ont dit qu'ils ne vont pas",
	"payer mes etudes a l'universite si je ne fais pas ce que je fais maintenant avec vous.",
	"S'il vous plait, ecoutez de mon message, parce que je sais que c'est vrait.",
	"Je sais que c'est vrait parce que j'ai resenti l'esprit apres beacoup d'angoisse--",
	"l'angoisse cause par le fait que je m'enbranle--",
	"et Jesus m'a dit que s'enbraler est mal, et il a ete blesse a cause de ca!",
	"(... he's continuing to ramble--it would be wise to back away now...)",
];

const grammaphone = [
	"Play it quietly; the missionary isn't allowed to listen...",
];

const DIALOGUE = {
	andre,
	joyce,
	falkner,
	stein,
	grendel,
	missionary,
	grammaphone,
};

export { DIALOGUE };