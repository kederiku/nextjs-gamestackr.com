import { getPayload } from "payload";
import config from "@payload-config";

const manufacturers = [
    {
        name: "Atari",
        slug: "atari",
        color: "#F5F5DC",
        platforms: [
            {
                name: "Atari 2600",
                slug: "atari-2600",
                type: "console",
                abbreviation: "2600",
                alternative_names: "Atari Video Computer System",
            },
            {
                name: "Atari 5200",
                slug: "atari-5200",
                type: "console",
                abbreviation: "5200",
                alternative_names: null,
            },
            {
                name: "Atari 7800",
                slug: "atari-7800",
                type: "console",
                abbreviation: "7800",
                alternative_names: null,
            },
            {
                name: "Atari Jaguar",
                slug: "atari-jaguar",
                type: "console",
                abbreviation: "JAGUAR",
                alternative_names: null,
            },
            {
                name: "Atari Lynx",
                slug: "atari-lynx",
                type: "portable",
                abbreviation: "LYNX",
                alternative_names: null,
            },
        ]
    },
    {
        name: "Sega",
        slug: "sega",
        color: "#E0FFFF",
        platforms: [
            {
                name: "SG-1000",
                slug: "sg-1000",
                type: "console",
                abbreviation: null,
                alternative_names: null,
            },
            {
                name: "Master System",
                slug: "master-system",
                type: "console",
                abbreviation: "MS",
                alternative_names: null,
            },
            {
                name: "Saturn",
                slug: "saturn",
                type: "console",
                abbreviation: null,
                alternative_names: null,
            },
            {
                name: "Mega Drive",
                slug: "mega-drive",
                type: "console",
                abbreviation: "MD",
                alternative_names: "Sega Genesis",
            },
            {
                name: "Dreamcast",
                slug: "dreamcast",
                type: "console",
                abbreviation: "DC",
                alternative_names: null,
            },
            {
                name: "Game Gear",
                slug: "game-gear",
                type: "portable",
                abbreviation: "GG",
                alternative_names: null,
            },
        ]
    },
    {
        name: "Microsoft",
        slug: "microsoft",
        color: "#90EE90",
        platforms: [
            {
                name: "Xbox",
                slug: "xbox",
                type: "console",
                abbreviation: "XBOX",
                alternative_names: null,
            },
            {
                name: "Xbox 360",
                slug: "xbox-360",
                type: "console",
                abbreviation: "360",
                alternative_names: null,
            },
            {
                name: "Xbox One",
                slug: "xbox-one",
                type: "console",
                abbreviation: "ONE",
                alternative_names: null,
            },
            {
                name: "Xbox Series X|S",
                slug: "xbox-x-s",
                type: "console",
                abbreviation: "X|S",
                alternative_names: null,
            },
        ]
    },
    {
        name: "Nintendo",
        slug: "nintendo",
        color: "#FFC8C8",
        platforms: [
            {
                name: "Game Boy",
                slug: "game-boy",
                type: "portable",
                abbreviation: "GB",
                alternative_names: null,
            },
            {
                name: "Game Boy Color",
                slug: "game-boy-color",
                type: "portable",
                abbreviation: "GBC",
                alternative_names: null,
            },
            {
                name: "Game Boy Advance",
                slug: "game-boy-advance",
                type: "portable",
                abbreviation: "GBA",
                alternative_names: null,
            },
            {
                name: "Nintendo DS",
                slug: "nintendo-ds",
                type: "portable",
                abbreviation: "DS",
                alternative_names: null,
            },
            {
                name: "Nintendo 3DS",
                slug: "nintendo-3ds",
                type: "portable",
                abbreviation: "3DS",
                alternative_names: null,
            },
            {
                name: "Nintendo Entertainment System (NES)",
                slug: "nintendo-entertainment-system-nes",
                type: "console",
                abbreviation: "NES",
                alternative_names: "Famicom",
            },
            {
                name: "Super Nintendo Entertainment System (SNES)",
                slug: "super-nintendo-entertainment-system-snes",
                type: "console",
                abbreviation: "SNES",
                alternative_names: "Super Famicom",
            },
            {
                name: "Nintendo 64",
                slug: "nintendo-64",
                type: "console",
                abbreviation: "N64",
                alternative_names: null,
            },
            {
                name: "GameCube",
                slug: "gamecube",
                type: "console",
                abbreviation: "GC",
                alternative_names: null,
            },
            {
                name: "Wii",
                slug: "wii",
                type: "console",
                abbreviation: "WII",
                alternative_names: null,
            },
            {
                name: "Wii U",
                slug: "wii-u",
                type: "console",
                abbreviation: "WII U",
                alternative_names: null,
            },
            {
                name: "Nintendo Switch",
                slug: "nintendo-switch",
                type: "console",
                abbreviation: "SWITCH",
                alternative_names: null,
            },
        ]
    },
    {
        name: "Sony",
        slug: "sony",
        color: "#ADD8E6",
        platforms: [
            {
                name: "Playstation",
                slug: "playstation",
                type: "console",
                abbreviation: "PS1",
                alternative_names: null,
            },
            {
                name: "Playstation 2",
                slug: "playstation-2",
                type: "console",
                abbreviation: "PS2",
                alternative_names: null,
            },
            {
                name: "Playstation 3",
                slug: "playstation-3",
                type: "console",
                abbreviation: "PS3",
                alternative_names: null,
            },
            {
                name: "Playstation 4",
                slug: "playstation-4",
                type: "console",
                abbreviation: "PS4",
                alternative_names: null,
            },
            {
                name: "Playstation 5",
                slug: "playstation-5",
                type: "console",
                abbreviation: "PS5",
                alternative_names: null,
            },
            {
                name: "Playstation Portable",
                slug: "playstation-portable",
                type: "portable",
                abbreviation: "PSP",
                alternative_names: null,
            },
            {
                name: "Playstation Vita",
                slug: "playstation-vita",
                type: "portable",
                abbreviation: "PS VITA",
                alternative_names: null,
            }
        ]
    },
    {
        name: "NEC",
        slug: "nec",
        color: "#E6E6FA",
        platforms: [
            {
                name: "PC Engine / TurboGrafx-16",
                slug: "pc-engine-turbografx-16",
                type: "console",
                abbreviation: "TG-16",
                alternative_names: null,
            },
            {
                name: "PC-FX",
                slug: "pc-fx",
                type: "console",
                abbreviation: null,
                alternative_names: null,
            },
        ]
    },
    {
        name: "SNK",
        slug: "snk",
        color: "#FFDAB9",
        platforms: [
            {
                name: "Neo Geo AES",
                slug: "neo-geo-aes",
                type: "console",
                abbreviation: "AES",
                alternative_names: null,
            },
            {
                name: "Neo Geo CD",
                slug: "neo-geo-cd",
                type: "console",
                abbreviation: "NGCD",
                alternative_names: null,
            },
            {
                name: "Neo Geo Pocket",
                slug: "neo-geo-pocket",
                type: "portable",
                abbreviation: "NGP",
                alternative_names: null,
            },
            {
                name: "Neo Geo Pocket Color",
                slug: "neo-geo-pocket-color",
                type: "portable",
                abbreviation: "NGPC",
                alternative_names: null,
            },
        ]
    },
    {
        name: "Bandai Namco",
        slug: "bandai-namco",
        color: "#FFFACD",
        platforms: [
            {
                name: "WonderSwan",
                slug: "wonderswan",
                type: "portable",
                abbreviation: "WS",
                alternative_names: null,
            },
            {
                name: "WonderSwan Color",
                slug: "wonderswan-color",
                type: "portable",
                abbreviation: "WSC",
                alternative_names: null,
            }
        ]
    }
];

const seed = async () => {
    const payload = await getPayload({ config });

    for (const manufacturer of manufacturers){
        const m = await payload.create({
            collection: "manufacturers",
            data: {
                name: manufacturer.name,
                slug: manufacturer.slug,
                color: manufacturer.color,
            }
        });
        for (const plaform of manufacturer.platforms || []) {
            await payload.create({
                collection: "platforms",
                data: {
                    name: plaform.name,
                    slug: plaform.slug,
                    type: plaform.type as "console" | "portable",
                    abbreviation: plaform.abbreviation,
                    alternative_names: plaform.alternative_names,
                    manufacturer: m.id
                },
            });
        }
    }
}


try {
    await seed();
    console.log('Seeding completed successfully');
    process.exit(0);
} catch (error) {
    console.error('Error during seeding: ', error);
    process.exit(1);
}
