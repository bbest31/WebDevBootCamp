var mongoose = require("mongoose");
var World = require("./models/world");
var Comment = require("./models/comment");

var data = [{
        name: "Tallarn",
        image: "https://vignette.wikia.nocookie.net/warhammer40k/images/6/67/Tallarn.jpg/revision/latest?cb=20100811035832",
        description: "Tallarn is a harsh Desert World in the Segmentum Tempestus that is the homeworld of the famed Tallarn Desert Raiders Regiments of the Imperial Guard. When it was first discovered by human settlers in the 29th Millennium it was classified as a verdant Agri-World. However, during the Horus Heresy in the early 31st Millennium, the Iron Warriors Traitor Legion -- intending to destroy all potential resistance before landing -- virus-bombed the planet from space, rendering it an inhospitable desert. Only then did the Chaos Space Marines land. Tallarn's few survivors emerged from their underground bunkers to stop the Iron Warriors' invasion. Soon, reinforcements from both sides arrived. It became clear to the Imperial forces the futility of fighting over a destroyed planet, but by then there was no turning back. Although it could not be guessed at the time, the Traitor Legion was motivated to attack the world beyond their mere appetite for destruction, for Tallarn was home to a potent Chaotic artefact. Since the poisoned environment made it impossible for infantry to operate outside of protective shelter, the only available option for battle was that of armoured tank warfare. The largest tank battle in human history erupted on the surface of Tallarn, involving some 10 million armoured vehicles. By the end of it, the Iron Warriors were defeated, and the wreckage of over a million tanks littered the sands.  Approximately twenty years after the Battle of Tallarn, the official Tallarn Desert Raiders Regiments of the Imperial Guard were formed. These regiments specialised in desert fighting and highly mobile armoured warfare, and were highly adept at ambushing enemy forces in the desert. The Tallarn Desert Raiders continued the Imperium of Man's attack on various worlds which had turned to Chaos until sometime during the later 31st Millennium, when they were recalled to their homeworld. The Cursus of Alganar, an ancient Chaos relic of black stone that served as a gateway between the Warp and the physical universe which had led the Iron Warriors to Tallarn in the first place, was discovered deep under the desert sands. Immediately after finding this relic, both the Eldar of the Biel-Tan Craftworld and the Iron Warriors spilled from the sky once more to claim this relic, even as the daemons of Chaos emerged from the Warp when the artefact activated. After months of fighting in a conflict that is known in Imperial records as the Cursus War, the Eldar and Tallarn Desert Raiders formed an alliance and destroyed the Chaos forces. After their combined victory over the Chaos hordes, both races exchanged rare promises of friendship, before the Eldar departed in peace. The people of Tallarn re-entombed the Chaos relic beneath the sulphurous sands of their world and turned their backs on it."
    },
    {
        name: "Fenris",
        image: "https://vignette.wikia.nocookie.net/warhammer40k/images/4/48/Fenris_updated.png/revision/latest?cb=20140810043624",
        description: "Fenris is a cold, icy Death World in the Segmentum Solar that is the homeworld and primary recruiting ground of the Space Wolves. The planet's culture is made almost entirely of scattered tribes similar to Viking Age Scandinavia. The Space Wolves keep a close watch over the people of the world, recruiting fallen warriors who have proved their valour in battle much like the Valkyries of Norse legend. The Space Wolves' fortress-monastery is called The Fang, a massive citadel built atop the tallest mountain of the only stable continent on the world, Asaheim. The Fang is the home base of the Space Wolves and extends into the surrounding mountain range as well as into orbit, drawing energy from the geothermic source of the planet's core. The complex includes huge ground-based anti-ship orbital defence weapons concealed as nearby peaks, docks at the summit for the Space Wolves' battle barges and strike cruisers, numerous shrines to the Emperor of Mankind along the lower slopes, and massive fusion and geothermal reactors deep underground. Outside of Terra itself, The Fang is considered one of the most impregnable fortresses in the galaxy. It has never been conquered, although the Thousand Sons Traitor Legion did manage to briefly occupy the outer slopes of The Fang after luring the bulk of the Space Wolves' forces away."
    },
    {
        name: "Calth",
        image: "https://vignette.wikia.nocookie.net/warhammer40k/images/1/12/Calth_1.png/revision/latest?cb=20150608061909",
        description: "Calth is an Imperial Civilised World in the Ultima Segmentum and is a part of the Realm of Ultramar that is ruled by the Ultramarines Space Marine Chapter. As part of Ultramar, Calth provides recruits for the Ultramarines Chapter. The Aspirants compete in a series of contests between hopefuls to determine who is worthy of joining the Space Marines. Calth's inhabitants live in subterranean hive cities where the deadly ultraviolet light of Calth's blazing blue sun cannot reach them. The caverns of Calth are constructed on such a huge scale, and with such grandeur, that they are as light and airy as any city of Macragge. The world above is an arid wasteland devoid of air and covered in the ruins of shattered cities. The atmosphere of the world was stripped away during a nuclear bombardment of the planet's hive cities during the Battle of Calth, one of the major campaigns of the Horus Heresy. This was when the Ultramarines and their ancient rivals the Word Bearers Traitor Legion under the command of First Captain Kor Phaeron and Erebus the Dark Apostle came into conflict."
    }
]

function seedDB() {
    //Remove all worlds
    World.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed worlds!");
        Comment.remove({}, function(err) {
            if (err) {
                console.log(err);
            }
            console.log("removed comments!");
            //add a few worlds
            data.forEach(function(seed) {
                World.create(seed, function(err, world) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log("added a world");
                        //create a comment
                        Comment.create({
                            text: "Adeptus Mechanicus presence provides adequate support for Titans and Dreadnaughts",
                            author: "Homer"
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                world.comments.push(comment);
                                world.save();
                                console.log("Created new comment");
                            }
                        });
                    }
                });
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;
