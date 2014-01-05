define([
    'jquery'
], function($){

		var CommonData = {
            window : window,
            $window : $(window),

            ctx : null,

            geoData    : null,
            eventsData : null,
            imageDataCollection: null,

            windowSize : { width: null, height: null },

            mouse     : { x: null, y: null },
            prevMouse : { x: null, y: null },
            touch     : { x: null, y: null },
            prevTouch : { x: null, y: null },
            touchDown : false,

			loading : false,
            loaded  : false,

            galleryWidth: 800,

            maruUpdateForceK : 0,
            namiUpdateForceK : 0,

            tweenValue : 0,
            tweenCurrentTime : 0,
            tweenDuration : 0,

            shapeToWeaveDuration: 1,

            mapTransformData: {
                // 'german unification'
                //"4184c143-98bd-4ca3-bfca-d40ed34acc9b" : "translate(-1200, -890)scale(3)",
                "4184c143-98bd-4ca3-bfca-d40ed34acc9b" : { 'translate': [-1270, -890], 'scale' : 3 },
                "17387c82-756d-4571-b611-3380f33eeee4" : { 'translate': [-1270, -910], 'scale' : 3 },

                // The decline of the ootoman empire 1878-1914
                "129dd05b-23a3-4ac9-934d-e46ccd96e736" : { 'translate': [-1400, -1000], 'scale' : 2.5 }, // 'Treaty of San Stefano'
                "cbeb1ebb-8d3f-4c5b-9736-81197b017b57" : { 'translate': [-1375, -1000], 'scale' : 2.5 }, //  'Balkan Wars'
                '3a71f13e-0bbb-4b34-8bd7-b4e27e61c40c' : { 'translate': [-240, -230], 'scale' : 1 }, // General Decline of the Empire
                '9a0ad0c3-87c7-4c79-810c-104c88c55992' : { 'translate': [-1900, -1470], 'scale' : 3.5 }, // The Beginning of the End

                // alliances 1879 - 1914
                'd1e02b06-5591-482a-92f3-a73075864aa5' : { 'translate': [-370, -360], 'scale' : 1.5 },// Alliances of World War One
                //'b1643d22-373f-48f5-9ab6-34f99809bb28' : { 'translate': [-370, -360], 'scale' : 1.5 },// Alliances of World War One

                // The schlieffen Plan
                '96b37eff-a5b4-40ff-9155-214747e40475' : { 'translate': [-100, 200], 'scale' : 0.5 },// Russia Rearming
                'aec3c8a6-4cde-4b2b-a9f5-aab3139326c4' : { 'translate': [-400, -360], 'scale' : 1.5 },// Germany “Surrounded

                // Balkan war
                '99cbd580-3c22-4f5e-9fc2-b9de4f02c460' : { 'translate': [-1900, -1470], 'scale' : 3.5 }, // So, What's the Problem?
                'f0529e6a-5f21-4167-b68c-eddc00018a1f' : { 'translate': [-1650, -1280], 'scale' : 3 }, // The First Balkan War
                '4ff76a8b-1adf-497b-b92b-b2130b292996' : { 'translate': [-1280, -1030], 'scale' : 3 }, // Annexation of Bosnia-Herzegovina by Austria-Hungary in 1908
                '43f7ac1b-1ef1-4ba2-8e4e-f4ffd17cbfb3' : { 'translate': [-1290, -1030], 'scale' : 2.5 },// Ethnic Importance in the Balkans
                '8006ad17-6972-4231-af5c-5a8baf670746' : { 'translate': [-1410, -1175], 'scale' : 2.8 },// So...what's the outcome?!

                //
                'ab36d007-98ee-4ef3-9d2a-fdc169654bba' : { 'translate': [-1450, -1100], 'scale' : 3.5 },// So...what's the outcome?!


                'default' : { 'translate': [ 0 , 0], 'scale' : 1 }

            },

            selectingCountries   : ['germany', 'france', 'uk', 'russia', 'turkey', 'albania', 'bosnia', 'bulgaria', 'croatia', 'greece', 'kosovo', 'macedonia', 'montenegro', 'romania', 'serbia', 'austria', 'hungary', 'czech', 'slovakia', 'denmark', 'poland', 'libya', 'italy', 'morocco', 'sudan', 'slovenia', 'japan', 'chn'],
            selectingCountriesID : ['DEU', 'FRA', 'GBR', 'RUS', 'TUR', 'ALB', 'BIH', 'BGR', 'HRV', 'GRC', 'KOS', 'MKD', 'MNE', 'ROU', 'SRB', 'AUT', 'HUN', 'CZE', 'SVK', 'DNK', 'POL', 'LBY', 'ITA', 'MAR', 'SDN', 'SVN', 'JPN', 'CHN'],
            selectingCountriesListArray: {},

            mapListCountry : ['Germany', 'France', 'United Kingdom', 'Russia', 'Ottoman Empire', 'Poland', 'Balkans', 'Denmark'],
            mapListCountryStyle: {
                'Germany'         : { id: ['DEU'], name: 'germany' },
                'France'          : { id: ['FRA'], name: 'france' },
                'United Kingdom'  : { id: ['GBR'], name: 'uk' },
                'Russia'          : { id: ['RUS'], name: 'russia' },
                'Ottoman Empire'  : { id: ['TUR'], name: 'turkey'},
                'Balkans'         : { id: ['ALB', 'BIH', 'BGR', 'HRV', 'GRC', 'KOS', 'MKD', 'MNE', 'ROU', 'SRB', 'SVN'], name: 'balkans'},
                'Austria-Hungary' : { id: ['AUT', 'HUN', 'CZE', 'SVK'], name: 'austria-hungary'},
                'Denmark'         : { id: ['DNK'], name: 'denmark'},
                'Poland'          : { id: ['POL'], name: 'poland'},
                'Libya'           : { id: ['LBY'], name: 'libya'},
                'Italy'           : { id: ['ITA'], name: 'italy'},
                'Morocco'         : { id: ['MAR'], name: 'morocco'},
                'Sudan'           : { id: ['SDN'], name: 'sudan'},
                'Japan'           : { id: ['JPN'], name: 'japan'},
                'China'           : { id: ['CHN'], name: 'china'},
                'Serbia'          : { id: ['SRB'], name: 'serbia'}
            },

            revMapListCountryStyle: {},
            revMapListCountryStyleName : {
                'germany' : 'Germany',
                'france'  : 'France',
                'uk'      : 'United Kingdom',
                'russia'  : 'Russia',
                'turkey'  : 'Ottoman Empire',
                'balkans' : 'Balkans',
                'austria-hungary' : 'Austria-Hungary',
                'denmark' : 'Denmark',
                'poland'  : 'Poland',
                'libya'   : 'libya',
                'italy'   : 'Italy',
                'morocco' : 'Morocco',
                'sudan'   : 'Sudan',
                'japan'   : 'Japan',
                'china'   : 'China',
                'serbia'  : 'Serbia'
            },

            centerPosition : [30, 50],
            countryScaleValue : {
                'Germany'         : { 'scale': 3, 'latitude': [ 9.9167, 51.5167] },
                'France'          : { 'scale': 3, 'latitude': [ 2, 47]  },
                'United Kingdom'  : { 'scale': 4, 'latitude': [ 0, 54] },
                'Russia'          : { 'scale': 0.5, 'latitude': [ 90, 60] },
                'Ottoman Empire'  : { 'scale': 3, 'latitude': [ 35.6, 39.1] },
                'Austria-Hungary' : { 'scale': 5, 'latitude': [ 19, 47.5] },
                'Poland'          : { 'scale': 3, 'latitude': [ 21, 52.2] },
                'Balkans'         : { 'scale': 3, 'latitude': [ 25.3, 42] },
                'Denmark'         : { 'scale': 6, 'latitude': [ 10, 56] },
                'Italy'           : { 'scale': 3, 'latitude': [ 12, 42] },
                'Libya'           : { 'scale': 3, 'latitude': [ 17, 27] },
                'Morocco'         : { 'scale': 4, 'latitude': [ -5, 32] },
                'Sudan'           : { 'scale': 3, 'latitude': [ 32, 15] },
                'China'           : { 'scale': 1, 'latitude': [ 103, 35] },
                'Japan'           : { 'scale': 2.5, 'latitude': [ 136, 37] },
                'Serbia'          : { 'scale': 6, 'latitude': [ 21.1333, 43.8167] }
            },





            debug : true
		};

        if(CommonData.debug){
            window.commonData = CommonData;
        }

        for(var i in CommonData.selectingCountries){
            var selectingCountry   = CommonData.selectingCountries[i];
            var selectingCountryID = CommonData.selectingCountriesID[i];

            CommonData.selectingCountriesListArray[selectingCountryID] = selectingCountry;
        }

        for(var j in CommonData.mapListCountryStyle){

            for(var k in CommonData.mapListCountryStyle[j]['id']){
                var countryID = CommonData.mapListCountryStyle[j]['id'][k];
                CommonData.revMapListCountryStyle[countryID] = j;
            }

        }


		return CommonData
	}
);