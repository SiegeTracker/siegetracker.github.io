let name;
let getResponse;
let id;
let getFullResponse;
let fullStats;
let parsedStats;
let rankedKills;
let rankedDeaths;
let rankedKD;

let ranks = [
  "Unranked",
  "Copper 4",
  "Copper 3",
  "Copper 2",
  "Copper 1",
  "Bronze 4",
  "Bronze 3",
  "Bronze 2",
  "Bronze 1",
  "Silver 4",
  "Silver 3",
  "Silver 2",
  "Silver 1",
  "Gold 4",
  "Gold 3",
  "Gold 2",
  "Gold 1",
  "Plat 3",
  "Plat 2",
  "Plat 1",
  "Diamond"
];

$(".info").hide();
$(".loader").hide();

$("#beobah").click(function() {
  $("#name").val(this.innerHTML);
  $("#button").click();
});

$("#maslorie").click(function() {
  $("#name").val(this.innerHTML);
  $("#button").click();
});

$("#beabah").click(function() {
  $("#name").val(this.innerHTML);
  $("#button").click();
});

$("#exitium").click(function() {
  $("#name").val(this.innerHTML);
  $("#button").click();
});

$("#name").keyup(function(event) {
  if (event.keyCode === 13) {
    $("#button").click();
  }
});

$("#button").click(function() {
  

  if ($("#name")[0].value) {
    $(".info").hide("fast");
    $(".loader").show("fast");

    name = $("#name")[0].value;

    var request = new XMLHttpRequest();
    request.open(
      "GET",
      `https://cors-anywhere.herokuapp.com/https://r6tab.com/api/search.php?platform=uplay&search=${name}`
    );
    request.responseType = "text";

    request.onload = function() {
      getResponse = JSON.parse(request.responseText);

      if (getResponse.totalresults !== 0) {
        id = getResponse["results"][0].p_id;

        if (getResponse["results"][0].kd < 100) {
          $("#kd").val(`0.${getResponse["results"][0].kd}`);
        } else {
          $("#kd").val(getResponse["results"][0].kd / 100);
        }

        $("#mmr").val(getResponse["results"][0].p_currentmmr);
        $("#rank").val(ranks[getResponse["results"][0].p_currentrank]);
        $("#level").val(getResponse["results"][0].p_level);

        request = new XMLHttpRequest();
        request.open(
          "GET",
          `https://cors-anywhere.herokuapp.com/https://r6tab.com/api/player.php?p_id=${id}`
        );
        request.responseType = "text";

        request.onload = function() {
          $(".info").show("fast");
          $(".loader").hide("fast");

          getFullResponse = JSON.parse(request.responseText);

          $("#mmr-prev").val(getFullResponse.season12mmr);
          $("#rank-prev").val(ranks[getFullResponse.season12rank]);

          $("#fav-atk").val(opid2name(getFullResponse.favattacker)[0]);
          $("#fav-dfd").val(opid2name(getFullResponse.favdefender)[0]);

          fullStats =
            "[" +
            getFullResponse.allstats +
            '["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","","",""]]';
          parsedStats = JSON.parse(fullStats);
          rankedKills = 0;
          rankedDeaths = 0;

          parsedStats.forEach(function(arr_value) {
            rankedKills += Number(arr_value[6]);
            rankedDeaths += Number(arr_value[7]);
          });

          rankedKD = (rankedKills / rankedDeaths).toFixed(2);

          $("#s-kd").val(rankedKD);
        };

        request.send();
      } else {
        $("#name")[0].value = "";
        $("#name")[0].placeholder = "There is no such player :(";
        $(".loader").hide("fast");
        $(".info").hide("fast");
      }
    };

    request.send();
  } else {
    $("#name")[0].placeholder = "You haven't entered your nickname :(";
    $(".info").hide("fast");
  }
});

function opid2name(opid) {
  if (opid == "1") {
    opname = "Assault Rifle";
    defatk = "0";
  } else if (opid == "2") {
    opname = "SMG";
    defatk = "0";
  } else if (opid == "3") {
    opname = "LMG";
    defatk = "0";
  } else if (opid == "4") {
    opname = "Sniper";
    defatk = "0";
  } else if (opid == "5") {
    opname = "Pistol";
    defatk = "0";
  } else if (opid == "6") {
    opname = "Shotgun";
    defatk = "0";
  } else if (opid == "7") {
    opname = "Machine Pistol";
    defatk = "0";
  } else if (opid == "8") {
    opname = "Shield";
    defatk = "0";
  } else if (opid == "9") {
    opname = "Granade";
    defatk = "0";
  } else if (opid == "B") {
    opname = "Utility";
    defatk = "0";
  } else if (opid == "2:1") {
    opname = "Smoke";
    defatk = "2";
  } else if (opid == "2:2") {
    opname = "Castle";
    defatk = "2";
  } else if (opid == "2:3") {
    opname = "Doc";
    defatk = "2";
  } else if (opid == "2:4") {
    opname = "Glaz";
    defatk = "1";
  } else if (opid == "2:5") {
    opname = "Blitz";
    defatk = "1";
  } else if (opid == "2:6") {
    opname = "Buck";
    defatk = "1";
  } else if (opid == "2:7") {
    opname = "Blackbeard";
    defatk = "1";
  } else if (opid == "2:8") {
    opname = "Capitao";
    defatk = "1";
  } else if (opid == "2:9") {
    opname = "Hibana";
    defatk = "1";
  } else if (opid == "2:A") {
    opname = "Jackal";
    defatk = "1";
  } else if (opid == "2:B") {
    opname = "Ying";
    defatk = "1";
  } else if (opid == "2:C") {
    opname = "Ela";
    defatk = "2";
  } else if (opid == "2:D") {
    opname = "Dokkaebi";
    defatk = "1";
  } else if (opid == "2:F") {
    opname = "Maestro";
    defatk = "2";
  } else if (opid == "3:1") {
    opname = "Mute";
    defatk = "2";
  } else if (opid == "3:2") {
    opname = "Ash";
    defatk = "1";
  } else if (opid == "3:3") {
    opname = "Rook";
    defatk = "2";
  } else if (opid == "3:4") {
    opname = "Fuze";
    defatk = "1";
  } else if (opid == "3:5") {
    opname = "IQ";
    defatk = "1";
  } else if (opid == "3:6") {
    opname = "Frost";
    defatk = "2";
  } else if (opid == "3:7") {
    opname = "Valkyrie";
    defatk = "2";
  } else if (opid == "3:8") {
    opname = "Caveira";
    defatk = "2";
  } else if (opid == "3:9") {
    opname = "Echo";
    defatk = "2";
  } else if (opid == "3:A") {
    opname = "Mira";
    defatk = "2";
  } else if (opid == "3:B") {
    opname = "Lesion";
    defatk = "2";
  } else if (opid == "3:C") {
    opname = "Zofia";
    defatk = "1";
  } else if (opid == "3:D") {
    opname = "Vigil";
    defatk = "2";
  } else if (opid == "3:E") {
    opname = "Lion";
    defatk = "1";
  } else if (opid == "3:F") {
    opname = "Alibi";
    defatk = "2";
  } else if (opid == "4:1") {
    opname = "Sledge";
    defatk = "1";
  } else if (opid == "4:2") {
    opname = "Pulse";
    defatk = "2";
  } else if (opid == "4:3") {
    opname = "Twitch";
    defatk = "1";
  } else if (opid == "4:4") {
    opname = "Kapkan";
    defatk = "2";
  } else if (opid == "4:5") {
    opname = "Jager";
    defatk = "2";
  } else if (opid == "4:E") {
    opname = "Finka";
    defatk = "1";
  } else if (opid == "5:1") {
    opname = "Thatcher";
    defatk = "1";
  } else if (opid == "5:2") {
    opname = "Thermite";
    defatk = "1";
  } else if (opid == "5:3") {
    opname = "Montagne";
    defatk = "1";
  } else if (opid == "5:4") {
    opname = "Tachanka";
    defatk = "2";
  } else if (opid == "5:5") {
    opname = "Bandit";
    defatk = "2";
  } else if (opid == "1:5") {
    opname = "GSG9";
    defatk = "3";
  } else if (opid == "1:4") {
    opname = "Spetsnaz";
    defatk = "3";
  } else if (opid == "1:3") {
    opname = "GIGN";
    defatk = "3";
  } else if (opid == "1:2") {
    opname = "FBI";
    defatk = "3";
  } else if (opid == "1:1") {
    opname = "SAS";
    defatk = "3";
  } else if (opid == "2:11") {
    opname = "Nomad";
    defatk = "1";
  } else if (opid == "3:11") {
    opname = "Kaid";
    defatk = "2";
  } else if (opid == "3:10") {
    opname = "Clash";
    defatk = "2";
  } else if (opid == "2:10") {
    opname = "Maverick";
    defatk = "1";
  } else {
    opname = opid;
    defatk = "3";
  }

  return [opname, defatk];
}
