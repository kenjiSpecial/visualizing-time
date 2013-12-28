/**
 * Created by kenji-special on 12/27/13.
 */
define([
    'helpers/commonData'
], function (CommonData) {

    var balkans = ['albania', 'bosnia', 'bulgaria', 'croatia', 'greece', 'kosovo', 'macedonia', 'montenegro', 'romania', 'serbia', 'turkey'];
    var austria = ['austria', 'hungary', 'czech', 'slovakia'];
    var russia = ['russia'];

    var eventData = {
        // --------------------
    	// 'german unification'
    	'2ffcd862-2f47-436b-960e-8fc234267ea7' : ['gallery', ['germany', 'france']], // 'Léon Gambetta'
    	'55ac2ff1-fef1-4006-a749-d118fc1c0ac2' : ['gallery', ['germany', 'france']], // 'Finding Balance'
    	'c4738c91-57bd-47b2-857a-60bb5764ce3e' : ['gallery', ['germany', 'france']], // Creation of "New Germany"
    	'31daff9d-91f4-43a9-b6ba-778b7f22b8f5' : ['gallery', ['uk', 'germany', 'france', 'russia']], // The Great Illusion
    	'4184c143-98bd-4ca3-bfca-d40ed34acc9b' : ['map', ['germany']], // Were Germans Unified?
    	'17387c82-756d-4571-b611-3380f33eeee4' : ['map', ['germany', 'denmark', 'france', 'poland', 'austria']], // What Does It Mean?!
        // --------------------

        // --------------------
    	// The decline of the ootoman empire 1878-1914
    	'129dd05b-23a3-4ac9-934d-e46ccd96e736' : ['map', ['russia', 'albania', 'bosnia', 'bulgaria', 'croatia', 'greece', 'kosovo', 'macedonia', 'montenegro', 'romania', 'serbia', 'turkey']], // 'Treaty of San Stefano'
    	'6c7d33d6-7f10-4c22-93fc-b1edde8d49b9' : ['gallery', ['germany', 'turkey', 'uk', 'france', 'turkey']], // 'Relations with Germany'
    	'cbeb1ebb-8d3f-4c5b-9736-81197b017b57' : ['map', ['albania', 'bosnia', 'bulgaria', 'croatia', 'greece', 'kosovo', 'macedonia', 'montenegro', 'romania', 'serbia', 'turkey', 'austria', 'hungary', 'russia', 'italy']], //  'Balkan Wars'
    	'0ccb5724-f943-4f6f-bfca-6d7817a161e6' : ['gallery', ['italy', 'turkey', 'libya']],// Italo-Libyan
    	'0c496019-9c3f-4395-b1cc-9260daad6272' : ['gallery', ['germany', 'turkey', 'uk']], // The Goeben and Breslau Incident
    	'3a71f13e-0bbb-4b34-8bd7-b4e27e61c40c' : ['map', ['turkey']], // General Decline of the Empire
    	'7d6ae126-119e-485e-b668-073147249222' : ['gallery', ['turkey']],// title: Young Turks - 1906, id: 7d6ae126-119e-485e-b668-073147249222
    	'9a0ad0c3-87c7-4c79-810c-104c88c55992' : ['map', ['albania', 'bosnia', 'bulgaria', 'croatia', 'greece', 'kosovo', 'macedonia', 'montenegro', 'romania', 'serbia', 'turkey']], // title: The Beginning of the End, id: 9a0ad0c3-87c7-4c79-810c-104c88c55992
        // --------------------

        // --------------------
        // alliances 1879 - 1914
        '1d3ea481-5437-41ea-ab3c-c11f49e4756a' : ['gallery', ['italy', 'austria', 'germany', 'turkey', 'bulgaria', 'serbia', 'russia', 'france', 'britain']], //title: Friends or Foes?, id: 1d3ea481-5437-41ea-ab3c-c11f49e4756a
        'c452db2c-e212-4bd3-a59c-3bacb374ab54' : ['gallery', ['germany', 'austria', 'hungary', 'czech', 'slovakia', 'france', 'italy', 'uk']], // title: Triple Alliance (1882) , id: c452db2c-e212-4bd3-a59c-3bacb374ab54
        '1a1bbe11-1709-4407-9653-cf8b98bd98f7' : ['gallery', ['uk', 'china', 'japan']],// title: Anglo-Japanese Alliance (1902), id: 1a1bbe11-1709-4407-9653-cf8b98bd98f7
        'd1e02b06-5591-482a-92f3-a73075864aa5' : ['map', ['japan', 'uk', 'austria', 'hungary', 'czech', 'slovakia', 'france', 'germany', 'italy', 'russia']],// title: Alliances of World War One, id: d1e02b06-5591-482a-92f3-a73075864aa5
        '1dec7e16-083b-4884-a81e-3a618ef440a5' : ['gallery', ['austria', 'hungary', 'czech', 'slovakia', 'germany', 'italy']], // title: Dual Alliance (1879), id: 1dec7e16-083b-4884-a81e-3a618ef440a5
        'e471a51c-c249-4876-9bc3-17c0e2a7ff9e' : ['gallery', ['france', 'russia']], //title: The Franco-Russian Alliance Military Convention - August 18, 1892, id: e471a51c-c249-4876-9bc3-17c0e2a7ff9e
        'b1643d22-373f-48f5-9ab6-34f99809bb28' : ['gallery', ['france', 'uk', 'russia']], // title: The Anglo-Russian Entente (1907), id: b1643d22-373f-48f5-9ab6-34f99809bb28
        '182b388b-0ecf-4528-a935-ce7f85f8bb2c' : ['gallery', ['france', 'uk']],// title: Anglo-French Entente (1904) , id: 182b388b-0ecf-4528-a935-ce7f85f8bb2c
        // --------------------

        // --------------------
        // War in Africa
        '49c5e6c2-a6fc-49b5-9469-ee768dcb7a55' : ['gallery', ['uk', 'netherlands', 'uk']], //title: War in Africa, id: 49c5e6c2-a6fc-49b5-9469-ee768dcb7a55
        // --------------------

        // --------------------
        // The Russo-Japanese War
        '7ea8a182-7a35-4493-b1f6-f533d32a851a' : ['gallery', ['russia', 'japan']], //    title: Outbreak of the War, id: 7ea8a182-7a35-4493-b1f6-f533d32a851a
        'dbcf2bee-99da-4525-9012-11b621abb470' : ['gallery', ['russia', 'japan', 'germany', 'austria', 'hungary', 'czech', 'slovakia']], //    title: A Shift of Power, id: dbcf2bee-99da-4525-9012-11b621abb470
        'da4284a9-0207-4636-b0b8-9251c57c7b2f' : ['gallery', ['russia', 'japan', 'uk']], //    title: European Impacts, id: da4284a9-0207-4636-b0b8-9251c57c7b2f
        '2fe8922f-b04a-4f2c-bd45-0442a58c6b72' : ['gallery', ['russia', 'japan', 'uk', 'china']], //    title: The Growth of Japan, id: 2fe8922f-b04a-4f2c-bd45-0442a58c6b72
        'e7900349-364c-4177-abf0-cb1589a58342' : ['gallery', ['russia', 'japan']], //    title: Treaty of Portsmouth, id: e7900349-364c-4177-abf0-cb1589a58342 exhibitCollection.js:26
        '024128ec-d1d8-4382-9d1d-e0223720e68d' : ['gallery', ['russia', 'japan']], //    title: Russia Defeated, id: 024128ec-d1d8-4382-9d1d-e0223720e68d
        'a1985468-e206-4048-8e1b-e696d7cb1ea4' : ['gallery', ['russia', 'france', 'uk']], //    title: Impacts, id: a1985468-e206-4048-8e1b-e696d7cb1ea4
        // --------------------

        // --------------------
        // The schlieffen Plan
        'f301bbf4-93f2-4612-9296-afc0bef1d778' : ['gallery', ['germany']], // title: General Count Alfred von Schlieffen, id: f301bbf4-93f2-4612-9296-afc0bef1d778
        '96b37eff-a5b4-40ff-9155-214747e40475' : ['map', ['germany', 'russia', 'japan']],     // title: Russia Rearming, id: 96b37eff-a5b4-40ff-9155-214747e40475
        'be400897-e849-47e2-971b-854300355620' : ['gallery', ['germany', 'russia', 'austria', 'hungary', 'czech', 'slovakia']], // title: The Alfred Redl Scandal, id: be400897-e849-47e2-971b-854300355620
        'aae5717a-af2c-440e-bb67-477c5224457f' : ['gallery', ['germany', 'belgium', 'france']], // title: Belgian Forts, id: aae5717a-af2c-440e-bb67-477c5224457f
        '53d4abcb-34bf-4a2f-95e9-653ef835afae' : ['gallery', ['germany', 'belgium', 'france']], // title: France and its Forts, id: 53d4abcb-34bf-4a2f-95e9-653ef835afae
        '5ff91ed0-6cbf-454f-89a6-aacd5eca7ce6' : ['gallery', ['germany', 'belgium', 'uk']], // title: Belgian Neutrality, id: 5ff91ed0-6cbf-454f-89a6-aacd5eca7ce6
        'aec3c8a6-4cde-4b2b-a9f5-aab3139326c4' : ['map', ['germany', 'uk']],     // title: Germany “Surrounded”, id: aec3c8a6-4cde-4b2b-a9f5-aab3139326c4
        'c1a58fc9-1acd-4846-9211-098385424ad9' : ['gallery', ['germany', 'russia']], // title: Details, details, details..., id: c1a58fc9-1acd-4846-9211-098385424ad9
        // --------------------

        // --------------------
        // 1st Moroccan Crisis
        '6db6a20b-8d3d-45e1-8f2b-4556f353b0f4' : ['gallery', ['morocco', 'germany', 'france']], //title: The Algeciras Conference, id: 6db6a20b-8d3d-45e1-8f2b-4556f353b0f4
        'c46acdad-fb74-4ed1-b21b-e462786f3bc4' : ['gallery', ['morocco', 'germany', 'france']],//title: How the 1st Crisis Broke Out, id: c46acdad-fb74-4ed1-b21b-e462786f3bc4 exhibitCollection.js:26
        '806d4379-57e2-44e7-8c56-6e881b5e5cca' : ['gallery', ['morocco', 'germany']],//title: Something to Think About..., id: 806d4379-57e2-44e7-8c56-6e881b5e5cca
        '4ef86390-1296-4613-957e-e6d45ad17e80' : ['gallery', ['sudan', 'uk', 'france']],//title: Fashoda, id: 4ef86390-1296-4613-957e-e6d45ad17e80

        // --------------------
        // 2nd Moroccan Crisis
        '2a771e05-a410-4836-9bd9-68ed70d42c23' : ['gallery'],// title: The Panther, id: 2a771e05-a410-4836-9bd9-68ed70d42c23 exhibitCollection.js:26
        '4ac7f4f4-34da-495c-b03e-df2973a2318d' : ['gallery'], // title: The End of the Crisis, id: 4ac7f4f4-34da-495c-b03e-df2973a2318d
        '16e36221-60a0-4006-9d10-9e63dc1cf131' : ['gallery'], // title: The Mansion House Speech, id: 16e36221-60a0-4006-9d10-9e63dc1cf131
        '12c6d6fd-3c66-4d41-b2bd-9995d6a1fe86' : ['gallery'], // title: Popular Responses, id: 12c6d6fd-3c66-4d41-b2bd-9995d6a1fe86
        '8948dfce-7311-4455-bf45-8a066052013b' : ['gallery'],  // title: July, 1911, id: 8948dfce-7311-4455-bf45-8a066052013b

        // --------------------

        // --------------------
        // Balkan war
        '99cbd580-3c22-4f5e-9fc2-b9de4f02c460' : ['map'], // title: So, What's the Problem?, id: 99cbd580-3c22-4f5e-9fc2-b9de4f02c460
        'f0529e6a-5f21-4167-b68c-eddc00018a1f' : ['map'],  // title: The First Balkan War, id: f0529e6a-5f21-4167-b68c-eddc00018a1f
        'ded7d0b0-1e31-45bf-b35c-f7d3ecdeb467' : ['gallery'],// title: The Second Balkan War 1913, id: ded7d0b0-1e31-45bf-b35c-f7d3ecdeb467
        '4ff76a8b-1adf-497b-b92b-b2130b292996' : ['map'], // title: Annexation of Bosnia-Herzegovina by Austria-Hungary in 1908, id: 4ff76a8b-1adf-497b-b92b-b2130b292996
        '97b68113-8600-4cb8-98fc-22d0d672220d' : ['galley'],// title: Wrestling for Control of the Balkans, id: 97b68113-8600-4cb8-98fc-22d0d672220d
        'cb6f7c06-9691-44af-a3ac-8115176a23b1' : ['gallery'],// title: The First Balkan War -- A Closer Look, id: cb6f7c06-9691-44af-a3ac-8115176a23b1
        '43f7ac1b-1ef1-4ba2-8e4e-f4ffd17cbfb3' : ['map'],// title: Ethnic Importance in the Balkans, id: 43f7ac1b-1ef1-4ba2-8e4e-f4ffd17cbfb3
        '972af7ee-2e2b-45ab-bfd5-63b6d2591489' : ['gallery'],// title: The Balkans, id: 972af7ee-2e2b-45ab-bfd5-63b6d2591489
        '8006ad17-6972-4231-af5c-5a8baf670746' : ['map'],// title: So...what's the outcome?!, id: 8006ad17-6972-4231-af5c-5a8baf670746

        // --------------------

        // --------------------
        // Assassination to Outbreak of War
        '7784cfc3-5cd4-43d5-a2fd-91232c124eab' : ['gallery'],//title: The Archduke, id: 7784cfc3-5cd4-43d5-a2fd-91232c124eab exhibitCollection.js:26
        '58da42c6-620f-4bf4-b31c-1b53ff0995a1' : ['gallery'], // title: His Family, id: 58da42c6-620f-4bf4-b31c-1b53ff0995a1 exhibitCollection.js:26
        '7cebbfe6-4299-4c16-8db0-6c8a1bef45ba' : ['gallery'], //title: Was Serbia Involved?, id: 7cebbfe6-4299-4c16-8db0-6c8a1bef45ba exhibitCollection.js:26
        '057f6249-99ba-45d9-9325-d6ceca795ed4' : ['gallery'], //title: The Black Hand, id: 057f6249-99ba-45d9-9325-d6ceca795ed4 exhibitCollection.js:26
        '4409f534-15b8-4598-be37-8b11d58b4a51' : ['gallery'], //title: Setting the Scene, id: 4409f534-15b8-4598-be37-8b11d58b4a51 exhibitCollection.js:26
        '990f6e3c-6639-4c59-a2ac-48bda02f8ce2' : ['gallery'], //title: The European Reaction, id: 990f6e3c-6639-4c59-a2ac-48bda02f8ce2 exhibitCollection.js:26
        'f7351011-a854-4b64-ae52-476875f0832e' : ['gallery'], //title: The Assassination, id: f7351011-a854-4b64-ae52-476875f0832e
        // --------------------

        // --------------------
        'e674975e-3f15-4c61-b716-21ea9bb32107' : ['gallery'],// title: Germany, id: e674975e-3f15-4c61-b716-21ea9bb32107 exhibitCollection.js:26
        '941f8509-10ba-46e2-be4d-34c3efd4fd37' : ['gallery'],// title: Austria-Hungary, id: 941f8509-10ba-46e2-be4d-34c3efd4fd37 exhibitCollection.js:26
        '7bfac254-323a-4c5e-a13c-1abe6bec4fdc' : ['gallery'], // title: Reactions, id: 7bfac254-323a-4c5e-a13c-1abe6bec4fdc exhibitCollection.js:26
        'ab36d007-98ee-4ef3-9d2a-fdc169654bba' : ['map'], // title: First assassination...now what?, id: ab36d007-98ee-4ef3-9d2a-fdc169654bba exhibitCollection.js:26
        '9073b91e-4475-4368-b9aa-8653dde0411a' : ['gallery'],// title: War?, id: 9073b91e-4475-4368-b9aa-8653dde0411a exhibitCollection.js:26
        '28c871a2-f9ba-4ff2-ad15-9564a28d865b' : ['gallery'],// title: Austria-Hungary Ultimatum to Serbia, id: 28c871a2-f9ba-4ff2-ad15-9564a28d865b exhibitCollection.js:26
        'a901e037-d777-4ab2-8a00-96dfb012861f' : ['gallery']// title: Options?, id: a901e037-d777-4ab2-8a00-96dfb012861f



};

    if(CommonData.debug){
        window.eventData = eventData;
    }

    return eventData;
});