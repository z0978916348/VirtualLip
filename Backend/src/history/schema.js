require('../../config.js');
const pgp = require('pg-promise')();
db = pgp(process.env.DB_URL);

const schemaSql = `
    -- Extensions
    --CREATE EXTENSION IF NOT EXISTS pg_trgm;

    -- Drop (droppable only when no dependency)
    DROP INDEX IF EXISTS lipsticks_idx_text;
    DROP INDEX IF EXISTS lipsticks_idx_ts;
    DROP TABLE IF EXISTS lipsticks;
    DROP INDEX IF EXISTS series_idx_text;
    DROP INDEX IF EXISTS series_idx_ts;
    DROP TABLE IF EXISTS series;
    DROP INDEX IF EXISTS brands_idx_text;
    DROP INDEX IF EXISTS brands_idx_ts;
    DROP TABLE IF EXISTS brands;
    DROP TABLE IF EXISTS temp;
    DROP TABLE IF EXISTS appuser;

    CREATE TABLE appuser (
      id        serial PRIMARY KEY NOT NULL,
      username  text,
      lipstick_name  text,
      color     text
    );

    CREATE TABLE temp (
        data    jsonb
    );

    CREATE TABLE brands (
        b_id            serial PRIMARY KEY NOT NULL,
        name            text
    );

    create table series (
        s_id        serial primary key not null,
        b_id        integer,
        name        text
    );

    create table lipsticks (
        l_id        serial primary key not null,
        id          text,
        b_id        integer,
        s_id        integer,
        color       text,
        name        text
        --foreign key (b_id) references brands,
        --foreign key (s_id) references series,
    );

    --CREATE INDEX brands_idx_ts ON brands USING btree(id);
    --CREATE INDEX brands_idx_text ON brands USING gin(data);
`;

const dataSql = `
    -- Populate temp
    INSERT INTO temp (data) VALUES
    ('{
        "brands": [{
          "name": "聖羅蘭",
          "series": [{
            "name": "瑩亮純魅唇膏",
            "lipsticks": [{
              "color": "#D62352",
              "id": "49",
              "name": "撩騷"
            }, {
              "color": "#DC4B41",
              "id": "14",
              "name": "一見傾心"
            }, {
              "color": "#B22146",
              "id": "05",
              "name": "浮生若夢"
            }, {
              "color": "#A25356",
              "id": "08",
              "name": "純真夢幻"
            }, {
              "color": "#DF3443",
              "id": "12",
              "name": "紅粉派對"
            }, {
              "color": "#E06C68",
              "id": "15",
              "name": "珊瑚戀人"
            }, {
              "color": "#842C71",
              "id": "19",
              "name": "華麗轉身"
            }, {
              "color": "#D13C4F",
              "id": "43",
              "name": "唇印"
            }, {
              "color": "#B71D32",
              "id": "04",
              "name": "危情禁果"
            }, {
              "color": "#DE2361",
              "id": "06",
              "name": "情竇初開"
            }, {
              "color": "#B05856",
              "id": "09",
              "name": "裸色暗戀"
            }, {
              "color": "#E06F70",
              "id": "13",
              "name": "邂逅巴黎"
            }, {
              "color": "#CD4143",
              "id": "16",
              "name": "糖果女孩"
            }, {
              "color": "#EC6A70",
              "id": "41",
              "name": "告白"
            }, {
              "color": "#EFE9DE",
              "id": "42",
              "name": "初戀"
            }, {
              "color": "#C60F2F",
              "id": "45",
              "name": "擁吻"
            }, {
              "color": "#BB6868",
              "id": "47",
              "name": "心跳"
            }, {
              "color": "#E0186B",
              "id": "50",
              "name": "約定"
            }, {
              "color": "#D45E85",
              "id": "52",
              "name": "遊戲"
            }, {
              "color": "#C16E6F",
              "id": "44",
              "name": "意外"
            }, {
              "color": "#D1121B",
              "id": "46",
              "name": "鍾情"
            }, {
              "color": "#8E243E",
              "id": "48",
              "name": "夜色"
            }, {
              "color": "#EE7486",
              "id": "51",
              "name": "私語"
            }]
          }, {
            "name": "純口紅",
            "lipsticks": [{
              "id": "19",
              "color": "#B13C79",
              "name": "玫紅色"
            }, {
              "id": "13",
              "color": "#BB1813",
              "name": "正橘色"
            }, {
              "id": "52",
              "color": "#EA4E59",
              "name": "星星色"
            }, {
              "id": "01",
              "color": "#B8122B",
              "name": "正紅色"
            }, {
              "id": "17",
              "color": "#F75E70",
              "name": "嫣粉紗麗"
            }, {
              "id": "07",
              "color": "#CB2276",
              "name": "雅紫紗蓉"
            }, {
              "id": "09",
              "color": "#C27482",
              "name": "絳紫絲絨"
            }, {
              "id": "11",
              "color": "#C06B72",
              "name": "藕粉雲羅"
            }, {
              "id": "16",
              "color": "#BB444A",
              "name": "緋紅香緞"
            }, {
              "id": "22",
              "color": "#E86E9F",
              "name": "瑩亮裸粉"
            }, {
              "id": "23",
              "color": "#DE6F5C",
              "name": "杏色府綢"
            }, {
              "id": "26",
              "color": "#CC6D84",
              "name": "堇色流紗"
            }, {
              "id": "36",
              "color": "#ED695D",
              "name": "珊瑚雪紡"
            }, {
              "id": "49",
              "color": "#DC4D8D",
              "name": "想你色"
            }, {
              "id": "51",
              "color": "#FA6C55",
              "name": "瑩亮珊瑚橙"
            }, {
              "id": "56",
              "color": "#D9100E",
              "name": "橙紅織錦"
            }, {
              "id": "59",
              "color": "#B96463",
              "name": "裸色薄紗"
            }, {
              "id": "207",
              "color": "#CA4061",
              "name": "珊瑚柚"
            }, {
              "id": "208",
              "color": "#D60846",
              "name": "玫紅色"
            }, {
              "id": "27",
              "color": "#D24379",
              "name": "純真玫紅"
            }, {
              "id": "50",
              "color": "#DC2923",
              "name": "前衛霓紅"
            }, {
              "id": "57",
              "color": "#C7153D",
              "name": "明亮裸唇"
            }, {
              "id": "58",
              "color": "#B25D84",
              "name": "明亮淡紫"
            }, {
              "id": "201",
              "color": "#B01020",
              "name": "紅唇印象"
            }, {
              "id": "202",
              "color": "#9E2C2C",
              "name": "瘋狂玫瑰"
            }, {
              "id": "203",
              "color": "#940220",
              "name": "搖滾紅唇"
            }, {
              "id": "205",
              "color": "#550001",
              "name": "天然漿果"
            }, {
              "id": "72",
              "color": "#9A1B2F",
              "name": ""
            }, {
              "id": "73",
              "color": "#CF0410",
              "name": ""
            }, {
              "id": "74",
              "color": "#E0291B",
              "name": ""
            }, {
              "id": "211",
              "color": "#E4004F",
              "name": "DECADENT"
            }, {
              "id": "212",
              "color": "#A53B4F",
              "name": "ALTERNATIVEPLUM"
            }, {
              "id": "213",
              "color": "#E94138",
              "name": "ORANGE SEVENTIES"
            }, {
              "id": "215",
              "color": "#E34E90",
              "name": "LUST FOR PINK"
            }, {
              "id": "216",
              "color": "#DE455A",
              "name": "RED CLASH"
            }, {
              "id": "217",
              "color": "#DE455A",
              "name": "NUDE TROUBLE"
            }]
          }, {
            "name": "瑩亮純魅美唇膏",
            "lipsticks": [{
              "id": "11",
              "color": "#D51768",
              "name": "玫色遊戲"
            }, {
              "id": "3",
              "color": "#F18885",
              "name": "玫瑰輕語"
            }, {
              "id": "8",
              "color": "#E52322",
              "name": "橙色放縱"
            }, {
              "id": "4",
              "color": "#DA0140",
              "name": "桃紅欲望"
            }, {
              "id": "1",
              "color": "#C05B60",
              "name": "裸色幻想"
            }, {
              "id": "2",
              "color": "#E87593",
              "name": "粉色嬉戲"
            }, {
              "id": "5",
              "color": "#630F28",
              "name": "梅色撩撥"
            }, {
              "id": "6",
              "color": "#CC0824",
              "name": "紅色觸碰"
            }, {
              "id": "7",
              "color": "#ED6D68",
              "name": "珊瑚挑逗"
            }, {
              "id": "9",
              "color": "#E73458",
              "name": "粉色縱情"
            }, {
              "id": "10",
              "color": "#A00F30",
              "name": "緋紅誘惑"
            }, {
              "id": "12",
              "color": "#B81D3D",
              "name": "苺色曖昧"
            }]
          }, {
            "name": "純色唇釉叛逆裸唇",
            "lipsticks": [{
              "id": "12",
              "color": "#D0011E",
              "name": "紅緋"
            }, {
              "id": "46",
              "color": "#9F182C",
              "name": "深紅色"
            }, {
              "id": "50",
              "color": "#C64E5B",
              "name": "自然珊瑚"
            }, {
              "id": "08",
              "color": "#C41304",
              "name": "唐橘"
            }, {
              "id": "07",
              "color": "#CC2010",
              "name": "蜜柚"
            }, {
              "id": "09",
              "color": "#D4020E",
              "name": "紅釉"
            }, {
              "id": "11",
              "color": "#D0010B",
              "name": "洋紅"
            }, {
              "id": "13",
              "color": "#CC030E",
              "name": "茜色"
            }, {
              "id": "15",
              "color": "#D41B40",
              "name": "桃紅"
            }, {
              "id": "42",
              "color": "#DF294E",
              "name": "風情橘紅"
            }, {
              "id": "43",
              "color": "#E23E44",
              "name": "玫瑰歌謠"
            }, {
              "id": "47",
              "color": "#BC3250",
              "name": "桃紅色"
            }, {
              "id": "48",
              "color": "#C13E30",
              "name": "橙色"
            }, {
              "id": "49",
              "color": "#BB325C",
              "name": "梅子色"
            }, {
              "id": "51",
              "color": "#951E53",
              "name": "玫紅色"
            }, {
              "id": "200",
              "color": "#DC9F8F",
              "name": "豐唇唇釉"
            }]
          }, {
            "name": "瑩亮絢染唇油",
            "lipsticks": [{
              "id": "05",
              "color": "#FF54A3",
              "name": "櫻桃情人"
            }, {
              "id": "04",
              "color": "#FF725D",
              "name": "粉戀玫瑰"
            }, {
              "id": "06",
              "color": "#C072B5",
              "name": "蜜桃熱戀"
            }, {
              "id": "07",
              "color": "#FFD0DD",
              "name": "橙色邂逅"
            }, {
              "id": "08",
              "color": "#FF7B1E",
              "name": "粉色憧憬"
            }]
          }, {
            "name": "甜吻唇頰霜",
            "lipsticks": [{
              "id": "05",
              "color": "#E21949",
              "name": "洋紅色"
            }, {
              "id": "01",
              "color": "#DD2269",
              "name": "玫紅色"
            }, {
              "id": "02",
              "color": "#E05572",
              "name": "櫻花粉"
            }, {
              "id": "03",
              "color": "#D16479",
              "name": "裸粉色"
            }, {
              "id": "04",
              "color": "#DF4A43",
              "name": "亮橘色"
            }, {
              "id": "07",
              "color": "#DC6B5D",
              "name": "珊瑚橙"
            }, {
              "id": "08",
              "color": "#DE6A78",
              "name": "珊瑚粉"
            }, {
              "id": "09",
              "color": "#BF7083",
              "name": "珊瑚柚"
            }, {
              "id": "12",
              "color": "#AD625E",
              "name": "摩卡色"
            }]
          }, {
            "name": "瑩亮燦金唇彩",
            "lipsticks": [{
              "id": "49",
              "color": "#D03370",
              "name": "騷動"
            }, {
              "id": "207",
              "color": "#D11746",
              "name": "激情"
            }, {
              "id": "03",
              "color": "#D34E59",
              "name": "憧憬"
            }, {
              "id": "15",
              "color": "#AB3B48",
              "name": "突然"
            }, {
              "id": "30",
              "color": "#DD6053",
              "name": "甜蜜"
            }, {
              "id": "203",
              "color": "#FE645A",
              "name": "心跳"
            }, {
              "id": "204",
              "color": "#FE5B56",
              "name": "意外"
            }, {
              "id": "206",
              "color": "#B80722",
              "name": "炙熱"
            }]
          }]
        }, {
          "name": "香奈兒可哥小姐",
          "series": [{
            "name": "唇膏水亮",
            "lipsticks": [{
              "id": "69",
              "color": "#F17365",
              "name": "傳情"
            }, {
              "id": "46",
              "color": "#E87268",
              "name": "自由"
            }, {
              "id": "122",
              "color": "#EA4D4A",
              "name": "CORAIL RADIEUX"
            }, {
              "id": "97",
              "color": "#D53D49",
              "name": "灑脫"
            }, {
              "id": "44",
              "color": "#FD4334",
              "name": "水漾紗麗"
            }, {
              "id": "507",
              "color": "#E94648",
              "name": "倔強"
            }, {
              "id": "114",
              "color": "#FF3220",
              "name": "SHIPSHAPE"
            }, {
              "id": "91",
              "color": "#C12A33",
              "name": "波希米亞"
            }, {
              "id": "84",
              "color": "#CE1220",
              "name": "對白"
            }, {
              "id": "57",
              "color": "#EB6F79",
              "name": "冒險"
            }, {
              "id": "116",
              "color": "#EC5193",
              "name": "MIGHTY"
            }, {
              "id": "54",
              "color": "#D1918D",
              "name": "卡柏男孩"
            }, {
              "id": "79",
              "color": "#E86A75",
              "name": "傳奇"
            }, {
              "id": "497",
              "color": "#ED5A5E",
              "name": "勇敢"
            }, {
              "id": "132",
              "color": "#E93A5B",
              "name": "ROSE RAVISSANT"
            }, {
              "id": "87",
              "color": "#F8657F",
              "name": "約會"
            }, {
              "id": "55",
              "color": "#F14C77",
              "name": "浪漫愛情"
            }, {
              "id": "118",
              "color": "#EB2755",
              "name": "ENERGY"
            }, {
              "id": "62",
              "color": "#E12948",
              "name": "蒙特卡羅"
            }, {
              "id": "134",
              "color": "#E7394A",
              "name": "RENOUVEAU"
            }, {
              "id": "98",
              "color": "#CC4D68",
              "name": "率真"
            }, {
              "id": "60",
              "color": "#BB395F",
              "name": "安蒂崗妮"
            }, {
              "id": "61",
              "color": "#C54463",
              "name": "幸福時光"
            }]
          }, {
            "name": "炫亮魅力唇膏",
            "lipsticks": [{
              "id": "90",
              "color": "#FC6E48",
              "name": "活潑"
            }, {
              "id": "96",
              "color": "#FA421C",
              "name": "古靈精怪"
            }, {
              "id": "182",
              "color": "#E02E20",
              "name": "VIBRANTE"
            }, {
              "id": "152",
              "color": "#E82F2C",
              "name": "隱約"
            }, {
              "id": "172",
              "color": "#E40021",
              "name": "ROUGE REBELLE"
            }, {
              "id": "135",
              "color": "#99413D",
              "name": "謎情"
            }, {
              "id": "99",
              "color": "#8A010D",
              "name": "海盜"
            }, {
              "id": "176",
              "color": "#A80D1F",
              "name": "INDEPENDANTE"
            }, {
              "id": "169",
              "color": "#8E2622",
              "name": "ROUGE TENTATION"
            }, {
              "id": "91",
              "color": "#E45661",
              "name": "吸引力"
            }, {
              "id": "179",
              "color": "#ED6160",
              "name": "LUMINOUS"
            }, {
              "id": "94",
              "color": "#FC3E6E",
              "name": "著迷"
            }, {
              "id": "138",
              "color": "#D93E5E",
              "name": "激昂"
            }, {
              "id": "136",
              "color": "#EF4246",
              "name": "悠揚"
            }, {
              "id": "178",
              "color": "#BF5363",
              "name": "NEW PRODIGIOUS"
            }, {
              "id": "158",
              "color": "#B24957",
              "name": "VIREVOLTANTE"
            }, {
              "id": "93",
              "color": "#CD0043",
              "name": "興奮"
            }, {
              "id": "165",
              "color": "#C82C40",
              "name": "EBLOUISSANTE"
            }, {
              "id": "184",
              "color": "#C80F2E",
              "name": "INCANTEVOLE"
            }, {
              "id": "102",
              "color": "#B20032",
              "name": "悸動"
            }]
          }, {
            "name": "炫亮魅力唇膏",
            "lipsticks": [{
              "id": "90",
              "color": "#E1527E",
              "name": "IMAGINATION"
            }]
          }, {
            "name": "炫亮魅力唇膏絲絨",
            "lipsticks": [{
              "id": "65",
              "color": "#E17062",
              "name": "LARISTOCRATICA"
            }, {
              "id": "64",
              "color": "#E84632",
              "name": "FIRST LIGHT"
            }, {
              "id": "57",
              "color": "#BE2B24",
              "name": "ROUGE FEU"
            }, {
              "id": "66",
              "color": "#E1112A",
              "name": "LINDOMABILE"
            }, {
              "id": "51",
              "color": "#9E333D",
              "name": "震撼"
            }, {
              "id": "56",
              "color": "#B23030",
              "name": "ROUGE CHARNEL"
            }, {
              "id": "38",
              "color": "#892833",
              "name": "迷惑"
            }, {
              "id": "58",
              "color": "#822E2E",
              "name": "ROUGE VIE"
            }, {
              "id": "63",
              "color": "#802932",
              "name": "NIGHTFALL"
            }, {
              "id": "61",
              "color": "#EC7879",
              "name": "LA SECRETE"
            }, {
              "id": "42",
              "color": "#FE697F",
              "name": "顯眼"
            }, {
              "id": "43",
              "color": "#FA5059",
              "name": "親愛"
            }, {
              "id": "46",
              "color": "#C92D38",
              "name": "慧黠"
            }, {
              "id": "37",
              "color": "#C43759",
              "name": "縱情"
            }, {
              "id": "44",
              "color": "#F06FA5",
              "name": "歌劇名伶"
            }, {
              "id": "50",
              "color": "#9F2F56",
              "name": "浪漫幻想"
            }]
          }]
        }, {
          "name": "迪奧",
          "series": [{
            "name": "魅惑釉唇膏",
            "lipsticks": [{
              "id": "457",
              "color": "#EB636B",
              "name": "雞尾酒"
            }, {
              "id": "487",
              "color": "#EB5C97",
              "name": "泡泡堂"
            }, {
              "id": "550",
              "color": "#E47082",
              "name": "小心計"
            }, {
              "id": "554",
              "color": "#EA5344",
              "name": "日光浴"
            }, {
              "id": "564",
              "color": "#E94858",
              "name": "購物狂"
            }, {
              "id": "577",
              "color": "#C86378",
              "name": "混日子"
            }, {
              "id": "637",
              "color": "#E74218",
              "name": "熱點"
            }, {
              "id": "644",
              "color": "#EA5331",
              "name": "生存遊戲"
            }, {
              "id": "684",
              "color": "#E60860",
              "name": "人生贏家"
            }, {
              "id": "740",
              "color": "#902216",
              "name": "可樂部"
            }, {
              "id": "744",
              "color": "#E51E1B",
              "name": "花蝴蝶"
            }, {
              "id": "794",
              "color": "#95358C",
              "name": "天生玩家"
            }, {
              "id": "857",
              "color": "#A01314",
              "name": "好萊塢大咖"
            }, {
              "id": "867",
              "color": "#901A32",
              "name": "紅酒"
            }, {
              "id": "877",
              "color": "#C4032B",
              "name": "給我迪奧"
            }, {
              "id": "882",
              "color": "#BB0E63",
              "name": "野蠻女友"
            }, {
              "id": "904",
              "color": "#391E1D",
              "name": "黑咖啡"
            }, {
              "id": "924",
              "color": "#602227",
              "name": "不羈"
            }]
          }, {
            "name": "魅惑染唇蜜",
            "lipsticks": [{
              "id": "351",
              "color": "#D8707D",
              "name": "魅惑染唇蜜"
            }, {
              "id": "421",
              "color": "#AD5F56",
              "name": "魅惑染唇蜜"
            }, {
              "id": "451",
              "color": "#E55461",
              "name": "Natural Coral"
            }, {
              "id": "491",
              "color": "#A76165",
              "name": "魅惑染唇蜜"
            }, {
              "id": "761",
              "color": "#E13D5D",
              "name": "Natural Cherry"
            }, {
              "id": "771",
              "color": "#974249",
              "name": "Natural Berry"
            }, {
              "id": "881",
              "color": "#EC6292",
              "name": "Natural Pink"
            }]
          }, {
            "name": "烈豔藍金唇膏",
            "lipsticks": [{
              "id": "028",
              "color": "#E83F4A",
              "name": "Actrice"
            }, {
              "id": "426",
              "color": "#D58F7F",
              "name": ""
            }, {
              "id": "481",
              "color": "#B76566",
              "name": ""
            }, {
              "id": "047",
              "color": "#E40068",
              "name": "迪奧小姐"
            }, {
              "id": "781",
              "color": "#833B43",
              "name": ""
            }, {
              "id": "060",
              "color": "#D36179",
              "name": "首映禮"
            }, {
              "id": "080",
              "color": "#D91820",
              "name": "微笑正紅"
            }, {
              "id": "861",
              "color": "#B52237",
              "name": ""
            }, {
              "id": "996",
              "color": "#BD7376",
              "name": ""
            }, {
              "id": "999",
              "color": "#A82628",
              "name": ""
            }, {
              "id": "999",
              "color": "#A82628",
              "name": "Metallic"
            }, {
              "id": "207",
              "color": "#BBC3C2",
              "name": "蒙田灰"
            }, {
              "id": "277",
              "color": "#DB7096",
              "name": "Osee"
            }, {
              "id": "343",
              "color": "#EF7C6B",
              "name": "Panarea"
            }, {
              "id": "351",
              "color": "#E46177",
              "name": "Dansante"
            }, {
              "id": "459",
              "color": "#D1546E",
              "name": "Charnelle"
            }, {
              "id": "520",
              "color": "#E4003E",
              "name": "Feel Good"
            }, {
              "id": "553",
              "color": "#DA4F4E",
              "name": "Sillage"
            }, {
              "id": "567",
              "color": "#EA5069",
              "name": "Rose en Dior"
            }, {
              "id": "576",
              "color": "#F08182",
              "name": "Pretty Matte"
            }, {
              "id": "602",
              "color": "#2E4763",
              "name": "狂想"
            }, {
              "id": "642",
              "color": "#EA5155",
              "name": "Ready"
            }, {
              "id": "643",
              "color": "#E84617",
              "name": "Stand Out"
            }, {
              "id": "652",
              "color": "#ED6C7F",
              "name": "珊瑚"
            }, {
              "id": "663",
              "color": "#D0546B",
              "name": "Desir"
            }, {
              "id": "665",
              "color": "#BD5154",
              "name": "Revee"
            }, {
              "id": "678",
              "color": "#CC4A6B",
              "name": "Culte"
            }, {
              "id": "746",
              "color": "#DC002C",
              "name": "Favorite"
            }, {
              "id": "756",
              "color": "#E52F31",
              "name": "Panache"
            }, {
              "id": "766",
              "color": "#CF1D59",
              "name": "Rose Harpers"
            }, {
              "id": "771",
              "color": "#E96C81",
              "name": "Radiant Matte"
            }, {
              "id": "772",
              "color": "#CB7A84",
              "name": "Classic Matte"
            }, {
              "id": "775",
              "color": "#E1244B",
              "name": "Hyde Park"
            }, {
              "id": "787",
              "color": "#E6699D",
              "name": "Exuberant Matte"
            }, {
              "id": "789",
              "color": "#96518F",
              "name": "癡迷"
            }, {
              "id": "844",
              "color": "#E0262E",
              "name": "Trafalgar"
            }, {
              "id": "856",
              "color": "#B62631",
              "name": "Celebre"
            }, {
              "id": "888",
              "color": "#EB5958",
              "name": "Strong Matte"
            }, {
              "id": "962",
              "color": "#86556D",
              "name": "奇葩"
            }, {
              "id": "999",
              "color": "#BE020D",
              "name": ""
            }, {
              "id": "999",
              "color": "#CC434D",
              "name": "傳奇紅唇啞光"
            }]
          }]
        }, {
          "name": "美寶蓮",
          "series": [{
            "name": "絕色持久唇膏絨情啞光",
            "lipsticks": [{
              "id": "MAT5",
              "color": "#99163A",
              "name": ""
            }, {
              "id": "R45M",
              "color": "#A22040",
              "name": ""
            }, {
              "id": "R41M",
              "color": "#C31431",
              "name": "COLOR SENSATIONAL VIVID MATTE"
            }, {
              "id": "MAT1",
              "color": "#EC5C80",
              "name": ""
            }, {
              "id": "MAT3",
              "color": "#EC594F",
              "name": ""
            }, {
              "id": "MAT5",
              "color": "#F193AD",
              "name": ""
            }]
          }]
        }, {
          "name": "紀梵希",
          "series": [{
            "name": "高定香榭天鵝絨唇膏（小羊皮）",
            "lipsticks": [{
              "id": "N103",
              "color": "#DF695F",
              "name": "優雅米色"
            }, {
              "id": "N103",
              "color": "#C74A52",
              "name": "迷人茶色"
            }, {
              "id": "N105",
              "color": "#A82A40",
              "name": "陽光小麥"
            }, {
              "id": "N202",
              "color": "#F43556",
              "name": "幻想玫瑰"
            }, {
              "id": "N204",
              "color": "#BE2446",
              "name": "櫻桃玫瑰"
            }, {
              "id": "N205",
              "color": "#E70060",
              "name": "加侖玫瑰"
            }, {
              "id": "N304",
              "color": "#F82131",
              "name": "加州紅"
            }, {
              "id": "N306",
              "color": "#E50036",
              "name": "法式紅"
            }, {
              "id": "N303",
              "color": "#FA054B",
              "name": "珊瑚紅"
            }, {
              "id": "N302",
              "color": "#FB2C60",
              "name": "芭比紅"
            }, {
              "id": "305",
              "color": "#FA013D",
              "name": "繆斯紅"
            }, {
              "id": "201",
              "color": "#FA6173",
              "name": "糖果玫瑰"
            }, {
              "id": "209",
              "color": "#F60071",
              "name": "明豔玫瑰"
            }, {
              "id": "210",
              "color": "#FF4D89",
              "name": "大麗玫瑰"
            }, {
              "id": "315",
              "color": "#AC003A",
              "name": "覆盆子紅"
            }, {
              "id": "317",
              "color": "#E03B35",
              "name": "暖柿紅"
            }, {
              "id": "307",
              "color": "#93142F",
              "name": "石榴紅"
            }, {
              "id": "301",
              "color": "#DF3751",
              "name": "西瓜紅"
            }, {
              "id": "214",
              "color": "#BB3C5A",
              "name": "復古玫瑰"
            }, {
              "id": "323",
              "color": "#C53057",
              "name": "高雅梅"
            }, {
              "id": "326",
              "color": "#932844",
              "name": "勃艮第紅"
            }, {
              "id": "327",
              "color": "#9B325A",
              "name": "莓紫紅"
            }, {
              "id": "324",
              "color": "#EE4650",
              "name": "秀場紅"
            }, {
              "id": "325",
              "color": "#E11020",
              "name": "聖水紅"
            }, {
              "id": "215",
              "color": "#844452",
              "name": "橡皮裸肌"
            }, {
              "id": "329",
              "color": "#731919",
              "name": "紅色高跟鞋"
            }, {
              "id": "330",
              "color": "#64263F",
              "name": "復古提琴"
            }, {
              "id": "331",
              "color": "#58151E",
              "name": "赤霞珠"
            }]
          }, {
            "name": "禁忌之吻霓虹唇膏",
            "lipsticks": [{
              "id": "11",
              "color": "#BA353C",
              "name": "禦姐橘"
            }, {
              "id": "7",
              "color": "#8B2844",
              "name": "幻想紫"
            }, {
              "id": "8",
              "color": "#B12252",
              "name": "暗夜莓"
            }, {
              "id": "9",
              "color": "#DD485B",
              "name": "沉睡紅"
            }, {
              "id": "10",
              "color": "#B53D52",
              "name": "帥T紅"
            }, {
              "id": "12",
              "color": "#B9282D",
              "name": "女巫紅"
            }, {
              "id": "13",
              "color": "#CA292E",
              "name": "禁忌紅"
            }, {
              "id": "14",
              "color": "#CB2D21",
              "name": "鬼魅紅"
            }, {
              "id": "15",
              "color": "#D43A29",
              "name": "夜光橘"
            }, {
              "id": "16",
              "color": "#DF4541",
              "name": "潮女紅"
            }, {
              "id": "18",
              "color": "#D35C5E",
              "name": "童話粉"
            }, {
              "id": "22",
              "color": "#EC2663",
              "name": "精靈粉"
            }, {
              "id": "23",
              "color": "#C62E54",
              "name": "魔女粉"
            }, {
              "id": "24",
              "color": "#AA2260",
              "name": "傲嬌粉"
            }, {
              "id": "17",
              "color": "#DD5852",
              "name": "乙女粉"
            }, {
              "id": "19",
              "color": "#E36476",
              "name": "治癒粉"
            }, {
              "id": "20",
              "color": "#EC6284",
              "name": "蘿莉粉"
            }, {
              "id": "21",
              "color": "#EA586F",
              "name": "元氣粉"
            }]
          }]
        }]
      }');

      -- insert data into brands
      insert into brands(name) select json_array_elements((data->>'brands')::json)->'name' from temp;

      -- insert data into series
      insert into series(b_id, name) select 1, json_array_elements((data->'brands'->0->>'series')::json)->'name' from temp;
      insert into series(b_id, name) select 2, json_array_elements((data->'brands'->1->>'series')::json)->'name' from temp;
      insert into series(b_id, name) select 3, json_array_elements((data->'brands'->2->>'series')::json)->'name' from temp;
      insert into series(b_id, name) select 4, json_array_elements((data->'brands'->3->>'series')::json)->'name' from temp;
      insert into series(b_id, name) select 5, json_array_elements((data->'brands'->4->>'series')::json)->'name' from temp;

      -- insert data into lipsticks
      --select item.result->>'color', item.result->>'id' from temp, (select json_array_elements(json_array_elements(json_array_elements((temp.data->>'brands')::json)->'series')->'lipsticks') result from temp) item;
      insert into lipsticks(b_id, s_id, color, id, name) select 1, 1, item.result->>'color', item.result->>'id', item.result->>'name' from temp, (select json_array_elements((temp.data->'brands'->0->'series'->0->>'lipsticks')::json) result from temp) item;
      insert into lipsticks(b_id, s_id, color, id, name) select 1, 2, item.result->>'color', item.result->>'id', item.result->>'name' from temp, (select json_array_elements((temp.data->'brands'->0->'series'->1->>'lipsticks')::json) result from temp) item;
      insert into lipsticks(b_id, s_id, color, id, name) select 1, 3, item.result->>'color', item.result->>'id', item.result->>'name' from temp, (select json_array_elements((temp.data->'brands'->0->'series'->2->>'lipsticks')::json) result from temp) item;
      insert into lipsticks(b_id, s_id, color, id, name) select 1, 4, item.result->>'color', item.result->>'id', item.result->>'name' from temp, (select json_array_elements((temp.data->'brands'->0->'series'->3->>'lipsticks')::json) result from temp) item;
      insert into lipsticks(b_id, s_id, color, id, name) select 1, 5, item.result->>'color', item.result->>'id', item.result->>'name' from temp, (select json_array_elements((temp.data->'brands'->0->'series'->4->>'lipsticks')::json) result from temp) item;
      insert into lipsticks(b_id, s_id, color, id, name) select 1, 6, item.result->>'color', item.result->>'id', item.result->>'name' from temp, (select json_array_elements((temp.data->'brands'->0->'series'->5->>'lipsticks')::json) result from temp) item;
      insert into lipsticks(b_id, s_id, color, id, name) select 1, 7, item.result->>'color', item.result->>'id', item.result->>'name' from temp, (select json_array_elements((temp.data->'brands'->0->'series'->6->>'lipsticks')::json) result from temp) item;
      insert into lipsticks(b_id, s_id, color, id, name) select 2, 8, item.result->>'color', item.result->>'id', item.result->>'name' from temp, (select json_array_elements((temp.data->'brands'->1->'series'->0->>'lipsticks')::json) result from temp) item;
      insert into lipsticks(b_id, s_id, color, id, name) select 2, 9, item.result->>'color', item.result->>'id', item.result->>'name' from temp, (select json_array_elements((temp.data->'brands'->1->'series'->1->>'lipsticks')::json) result from temp) item;
      insert into lipsticks(b_id, s_id, color, id, name) select 2, 10, item.result->>'color', item.result->>'id', item.result->>'name' from temp, (select json_array_elements((temp.data->'brands'->1->'series'->2->>'lipsticks')::json) result from temp) item;
      insert into lipsticks(b_id, s_id, color, id, name) select 2, 11, item.result->>'color', item.result->>'id', item.result->>'name' from temp, (select json_array_elements((temp.data->'brands'->1->'series'->3->>'lipsticks')::json) result from temp) item;
      insert into lipsticks(b_id, s_id, color, id, name) select 3, 12, item.result->>'color', item.result->>'id', item.result->>'name' from temp, (select json_array_elements((temp.data->'brands'->2->'series'->0->>'lipsticks')::json) result from temp) item;
      insert into lipsticks(b_id, s_id, color, id, name) select 3, 13, item.result->>'color', item.result->>'id', item.result->>'name' from temp, (select json_array_elements((temp.data->'brands'->2->'series'->1->>'lipsticks')::json) result from temp) item;
      insert into lipsticks(b_id, s_id, color, id, name) select 3, 14, item.result->>'color', item.result->>'id', item.result->>'name' from temp, (select json_array_elements((temp.data->'brands'->2->'series'->2->>'lipsticks')::json) result from temp) item;
      insert into lipsticks(b_id, s_id, color, id, name) select 4, 15, item.result->>'color', item.result->>'id', item.result->>'name' from temp, (select json_array_elements((temp.data->'brands'->3->'series'->0->>'lipsticks')::json) result from temp) item;
      insert into lipsticks(b_id, s_id, color, id, name) select 5, 16, item.result->>'color', item.result->>'id', item.result->>'name' from temp, (select json_array_elements((temp.data->'brands'->4->'series'->0->>'lipsticks')::json) result from temp) item;
      insert into lipsticks(b_id, s_id, color, id, name) select 5, 17, item.result->>'color', item.result->>'id', item.result->>'name' from temp, (select json_array_elements((temp.data->'brands'->4->'series'->1->>'lipsticks')::json) result from temp) item;
`;

db.none(schemaSql).then(() => {
    console.log('Schema created');
    db.none(dataSql).then(() => {
        console.log('Data populated');
        pgp.end();
    });
}).catch(err => {
    console.log('Error creating schema', err);
});
