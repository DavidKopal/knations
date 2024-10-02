let year = 1261
let month = 0
let selected = ''

let groups = {
    west_slavic: {
        names: ['David', 'Dawid', 'Lukász', 'Lukasz', 'Patrik', 'Matej', 'Pavel', 'Pawel'],
        dynasties: ['Kopal', 'Novák', 'Nowiak', 'Rukisz', 'Lobkowicz', 'Jagiellon']
    },
    east_slavic: {
        names: ['Dmitry', 'Vladimir', 'Alexey', 'Ivan', 'Sergey', 'Mikhail', 'Pavel', 'Anatoly'],
        dynasties: ['Romanov', 'Rurik', 'Suvorov', 'Bagration', 'Golitsyn', 'Vorontsov']
    },
    greek: {
        names: ['Dimitris', 'Georgios', 'Vasilis', 'Kostas', 'Nikos', 'Petros', 'Andreas', 'Alexandros'],
        dynasties: ['Palaiologos', 'Komnenos', 'Laskaris', 'Angelos', 'Mouzelis', 'Kallergis']
    },    
    germanic: {
        names: ['Hans', 'Fritz', 'Lukas', 'Matthias', 'Johann', 'Klaus', 'Maximilian', 'Stefan', 'Karl'],
        dynasties: ['Hohenzollern', 'Wettin', 'Welf', 'Lothringen', 'Habsburg', 'Nassau', 'Newman']
    },    
}

let ideologies = {
    monarchy: {
        tsardom: {
            min: 200,
            max: 325,
            rebellion: 5,
            cost: 2,
            elections: 0,
            agg: 10,
            rnums: true
        },
        duchy: {
            min: 150,
            max: 225,
            rebellion: 3,
            cost: 3,
            elections: 0,
            agg: 7,
            rnums: true
        },
        kingdom: {
            min: 175,
            max: 300,
            rebellion: 4,
            cost: 2,
            elections: 0,
            agg: 8,
            rnums: true
        },
    },
    democracy: {
        republic: {
            min: 150,
            max: 225,
            rebellion: 2,
            cost: 3,
            elections: 2,
            agg: 5,
            rnums: false
        }
    },
    socialist: {
        socialism: {
            min: 150,
            max: 225,
            rebellion: 2,
            cost: 3,
            elections: 2,
            agg: 5,
            rnums: false
        }
    }
}

let nations = {
    BOH: {
        tag: 'BOH',
        colors: ['#ff0000', '#ffffff', '#ff0000'],
        localisation: {
            NAME: 'Bohemian Crown',
            _IAN: 'Bohemian',
            OF: 'Bohemia'
        },
        group: 'west_slavic',
        past_leaders: ['David'],
        leader: {
            name: 'David',
            dynasty: 'Kopal',
            age: 23
        },
        heir: {
            name: 'Lukász',
            dynasty: 'Kopal',
            age: 14
        },
        ideology: 'monarchy/duchy',
        personel: 1268,
        cash: 2397
    },
    RUS: {
        tag: 'RUS',
        colors: ['#ffff00', '#ffffff', '#ffff00'],
        localisation: {
            NAME: 'Russian Tsardom',
            _IAN: 'Russian',
            OF: 'Russia'
        },
        group: 'east_slavic',
        past_leaders: ['Ivan'],
        leader: {
            name: 'Ivan',
            dynasty: 'Vorontsov',
            age: 31
        },
        heir: {
            name: 'Alexey',
            dynasty: 'Vorontsov',
            age: 20
        },
        ideology: 'monarchy/tsardom',
        personel: 3792,
        cash: 4877
    },
    GRE: {
        tag: 'GRE',
        colors: ['#ffffff', '#7878ff', '#7878ff'],
        localisation: {
            NAME: 'Republic of Greece',
            _IAN: 'Greek',
            OF: 'Greece'
        },
        group: 'greek',
        past_leaders: ['Kostas'],
        leader: {
            name: 'Kostas',
            dynasty: 'Mouzelist',
            age: 48
        },
        heir: {
            name: 'None',
            dynasty: 'Mouzelist',
            age: 20
        },
        ideology: 'democracy/republic',
        personel: 2240,
        cash: 1870
    },
    ENG: {
        tag: 'ENG',
        colors: ['#fff', '#f00', '#fff', '#f00', '#fff'],
        localisation: {
            NAME: 'Anglo-Saxon Unity',
            _IAN: 'Anglo',
            OF: 'Anglo-Saxonic'
        },
        group: 'germanic',
        past_leaders: ['Karl'],
        leader: {
            name: 'Karl',
            dynasty: 'Newman',
            age: 21
        },
        heir: {
            name: 'Karl',
            dynasty: 'Newman',
            age: 11
        },
        ideology: 'monarchy/kingdom',
        personel: 1322,
        cash: 1187
    },
}

function Romanise(num) {
    const roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    const value = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let result = '';
    for (let i = 0; i < value.length; i++) {
        while (num >= value[i]) {
            result += roman[i];
            num -= value[i];
        }
    }
    return result;
}

function info(tag) {
    selected = tag
    if (nations[tag]) {
        let nation = nations[tag]
        let ideology = ideologies[nation.ideology.split('/')[0]][nation.ideology.split('/')[1]]
        let past = 0
        if (ideology.rnums == true) {
            nation.past_leaders.forEach(name => {
                if (name == nation.leader.name) {
                    past += 1
                }
            })
            past = Romanise(past)
        } else {
            past = ''
        }
        document.getElementById('name').textContent = 'Name: ' + nation.localisation.NAME
        document.getElementById('tag').textContent = 'Tag: ' + nation.tag
        document.getElementById('leader').textContent = 'Leader: ' + nation.leader.name + ' ' + past + '|' + 'Age: ' + nation.leader.age
        document.getElementById('heir').textContent = 'Heir: ' + nation.heir.name + '|' + 'Age: ' + nation.heir.age
        document.getElementById('dynasty').textContent = 'Dynasty: ' + nation.leader.dynasty
        document.getElementById('idea').textContent = 'Ideology: ' + nation.ideology
    }
}

function forceInvasion(tag1, tag2) {
    let nation = nations[tag1]
    let nation2 = nations[tag2]
    if (nation.personel > nation2.personel) {
        nation.personel -= Math.floor(nation2.personel/4)
        nation2.personel -= Math.floor(nation2.personel/3.5)
        nation.cash += Math.floor(nation2.cash / 3)
        nation2.cash -= Math.floor(nation2.cash / 3)
    } else if (nation.personel > nation2.personel) {
        nation2.personel -= Math.floor(nation.personel/4)
        nation.personel -= Math.floor(nation.personel/3.5)
        nation2.cash += Math.floor(nation.cash / 3)
        nation.cash -= Math.floor(nation.cash / 3)
    }
}

function Update() {
    month += 1
    if (month == 13) {
        month = 1
        year += 1
        age = true
    }
    document.getElementById('time').textContent = 'Date: ' + year + ':' + month
    document.getElementById('nations').innerHTML = ''
    for (let nation in nations) {
        nation = nations[nation]

        let ideology = ideologies[nation.ideology.split('/')[0]][nation.ideology.split('/')[1]]

        if (month == 1) {
            nation.leader.age += 1
            if (ideology.elections == 0) {
                nation.heir.age += 1
                if (nation.leader.age == 60) {
                    nation.leader.name = nation.heir.name
                    nation.leader.age = nation.heir.age
                    nation.past_leaders.push(nation.leader.name)
                    nation.heir.age = 0
                    nation.heir.name = groups[nation.group].names[Math.floor(Math.random() * 2)]
                }
            } else {
                if (!(String(year / 2).includes('.'))) {
                    nation.leader.name = groups[nation.group].names[Math.floor(Math.random() * 2)]
                    nation.leader.dynasty = groups[nation.group].dynasties[Math.floor(Math.random() * 2)]
                    nation.heir.age = 0
                    nation.heir.name = 'None'
                }
            }
        }

        if (Math.floor(Math.random() * 551) <= ideology.rebellion) {
            nation.leader.name = groups[nation.group].names[Math.floor(Math.random() * groups[nation.group].names.length)]
            nation.leader.age = 19
            nation.past_leaders.push(nation.leader.name)
            if (ideologies.elections > 0) {
                nation.heir.age = 0
            nation.heir.name = groups[nation.group].names[Math.floor(Math.random() * groups[nation.group].names.length)]
            }
            nation.past_leaders = []
        }

        if (Math.floor(Math.random() * 36) <= ideology.agg) {
            let array = Object.keys(nations)
            let nation2 = nations[array[Math.floor(Math.random() * array.length)]]
            if (nation.personel > nation2.personel) {
                nation.personel -= Math.floor(nation2.personel/4)
                nation2.personel -= Math.floor(nation2.personel/3.85)
                nation.cash += Math.floor(nation2.cash / 3)
                nation2.cash -= Math.floor(nation2.cash / 3)
            } else if (nation.personel > nation2.personel) {
                nation2.personel -= Math.floor(nation.personel/4)
                nation.personel -= Math.floor(nation.personel/3.5)
                nation2.cash += Math.floor(nation.cash / 3)
                nation.cash -= Math.floor(nation.cash / 3)
            }
        }

        nation.cash += Math.floor(Math.random() * (ideology.max - ideology.min + 1) + ideology.min)
        if (!(String(month / 3).includes('.'))) {
            let max = Math.floor(nation.cash / ideology.cost);
            nation.personel += Math.floor(max / 4);
            nation.cash -= Math.floor(nation.cash / 4);

        }

        let color = 'linear-gradient(to right, '
        nation.colors.forEach(colore => {
            color += colore + ','
        })
        color = color.slice(0, -1) + ')'

        let width = 650

        document.getElementById('nations').innerHTML += `<li onclick="info('${nation.tag}')" style="border:2px solid black ;width: ${width}px;padding-left: 10px; font-size: 30px; background-image: ${color}">${nation.localisation.NAME}|GDP:${nation.cash}|Personel:${nation.personel}</li>`
    }
    if (selected !== '') {
        info(selected)
    }
}

setInterval(Update, 1000)
