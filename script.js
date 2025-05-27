const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');

const segments = [
  "  lil things im excited bout",
  "         gets me wetter than water",
  " fav untold memory",
  "harry's rizz",
  "   missing the most rn",
  "       moments i shouldve left u",
  "classic neerav",
  "peak us"
];

const rawResponses = {
   "  lil things im excited bout": [
    "getting our first dog tg",
    "coming home and yapping bout each others days",
    "random night drives w our fav songs cause were bored",
    "cooking dinner tggg or u cook i sit on the counter and admire you",
    "waking up next to ur pretty face",
    "grocery shopping w u every week"
  ],
  "         gets me wetter than water": [
    "when u get all confident and cocky",
    "when ur studying or working idk why im weird lmao",
    "HAND - NO, EVEN UR PINKY - ON MY THIGH OHHH MYYY GAWWWDDD 💦💦💦",
    "when u wear a button down shirrttt like oh my gawd unreal",
    "when u speak in hindi sometimes dont ask why",
    "when u moan during make out - i literally lose my mind💦"
  ],
   " fav untold memory": [
    "i didnt tell u but  tbh the very first thing i saw in u when we met were ur boobies and i was like damnnnnnnn lmaoo",
    "first time i came to watch u play bb u came and randomly kissed my forehead and BAZILLIONS of butterflies and i think bout it all the time to this day",
    "second day after diwali vacation we were eating at kc quietly i realised we were alr at the comfortable silence level and how much i loved the peace in the relationship",
    "random thursday in march coming back from classes at 7 i was pushing u away on the road cause u said sm stupid and annoying (as usual) and inside i was screaming w happiness cause ive never been this happy w anyone",
    "the feeling i got when i saw u w ur dogsss lwk imagined u as the father of my kids, maybe i getting forward here (idrc i want that)",
    "17 nov - i was having the worst day but we spent the afternoon at lib and  i was so happy full rest of the day i mightve just cried when u got on the shuttle (when i knew fs i was in love w u)"
  ],
  "harry's rizz": [
    "ur so hot i need spf 100 to just look at you",
    "my phone literally overheats when u send me a shirtless pic",
    "u so pretty i look at ur face i forget who i am for a sec",
    "just smile at me and i start ovulating (i not kidding)",
    "u just have to exist and ma ovaries go nutssss",
    "that smile of urs bbgorl it could stop WARS"
  ],
  "   missing the most rn": [
    "meow meowing irllllll",
    "holding ur hand (i did NOT realise how much i need it)",
    "ur shoulders ur hands  ur face ur eyes ur voice ur smile ur scet ur eyelashes ur laugh UR STUPID LIL HEAD FUCK I MISS YOU",
    "making outttttttttttt w ur hot ass 💦💦💦💦💦💦💦",
    "touching ur faceeee and squeezing ur cheekssss taking adv of ma girlf priveliges hehehe",
    "that lil thing u do when u see meee u open ur mouth wideee and go hiiiii babeee ITS SO CUTEEEEEE"
  ],
  "       moments i shouldve left u": [
    "everytime i see u in those slippers tbh",
    "when u ate the burger off the table ON THE FIRST DATE NAHHH",
    "when u were tying my laces and i saw ur bald spot  👀",
    "when u made that joke bout the babies having sex in my stomach that was just WRONG 😭",
    "when u didnt wish me at 12 on my bday (cough cough) remember that? (cough cough)",
    "the first kiss lmao what was that"
  ],
  "classic neerav": [
    "“balls” “nigga”  - 90 percent of vocabulary",
    "narc checking urself out every 2.5 mins 👎",
    "running ur hand through perfectly good hair and thinking u did sm",
    "follow up a 100 word essay w whatever its not that deep",
    "starts laughing like a moron GOD KNOWS WHY when 40 people are watching 😭",
    "saying “im straight” when everyone knows the truth 👀",
    "saying chill out when i chill AND PISSING ME TF OFF"
  ],
  "peak us": [
    "getting caught every.single.time 😭",
    "u farting in front of me- THE BIGGEST MOMENT (its oka it smelled like roses cause i love u)",
    "U FORGETTING TO WISH ME AT 12 HAHAHA ISNT THAT SO FUNNY AHAHAHAHAHA",
    "saying gn like 50 times and still yapping (love this)",
    "making dumb jokes anyone else would find weird and absolutely dying laughing (yo this whole website thing is making me cry i miss you babe so much)"
  ]
};

const responses = {};
for (const segment in rawResponses) {
  responses[segment] = {
    all: [...rawResponses[segment]],
    remaining: shuffle([...rawResponses[segment]])
  };
}

// Helper: Fisher-Yates Shuffle
function shuffle(array) {
  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

const colors = ['#ff6666', '#ffcc33', '#ffff66', '#66ff66', '#66ffff', '#6699ff', '#cc66ff', '#ff66b2'];

const numSegments = segments.length;
const arcSize = (2 * Math.PI) / numSegments;
let currentAngle = 0;

function drawWheel(rotation = 0) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < numSegments; i++) {
    const startAngle = i * arcSize + rotation;
    const endAngle = startAngle + arcSize;

    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, startAngle, endAngle);
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();

    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(startAngle + arcSize / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "12px Georgia";
    ctx.fillText(segments[i], 160, 5);
    ctx.restore();
  }
}

function getSelectedSegment(finalAngle) {
  // Adjust for arrow at top center (12 o'clock)
  const adjustedAngle = (finalAngle + Math.PI / 2) % (2 * Math.PI);
  const normalizedAngle = (2 * Math.PI - adjustedAngle) % (2 * Math.PI);
  return Math.floor(normalizedAngle / arcSize);
}

document.getElementById('spinBtn').addEventListener('click', () => {
  const randomSpins = 4 + Math.random() * 4; 
  const targetRotation = randomSpins * 2 * Math.PI; 

  let frame = 0;
  const totalFrames = 80;
  const startAngle = currentAngle;

  function animate() {
    frame++;
    const progress = frame / totalFrames;
    const easeOut = 1 - Math.pow(1 - progress, 3);
    currentAngle = startAngle + easeOut * targetRotation;

    drawWheel(currentAngle);

    if (frame < totalFrames) {
      requestAnimationFrame(animate);
    } else {
      const index = getSelectedSegment(currentAngle);
      const segment = segments[index];
      let segmentData = responses[segment];

      if (segmentData.remaining.length === 0) {
        segmentData.remaining = shuffle([...segmentData.all]);
      }
      const randomResponse = segmentData.remaining.pop();

      document.getElementById("segmentTitle").textContent = segment;
      document.getElementById("resultText").textContent = randomResponse;
    }
  }

  animate();
});

drawWheel();












