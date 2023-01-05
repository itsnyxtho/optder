function exchange() {
  // Define display file.
  pjs.defineDisplay("display", "exchange.json");
  pjs.defineDisplay("display", "commodity.json");
  pjs.defineDisplay("display", "senarios.json");
  pjs.defineDisplay("display", "analysis.json");
  pjs.defineDisplay("display", "flocks.json");
  pjs.defineDisplay("display", "rations.json");
  pjs.defineDisplay("display", "settings.json");
  pjs.defineDisplay("display", "global.json");


  // Retrieve data from database tables.
  let corn = pjs.query('SELECT * FROM `cbot_corn_chris--cme_c1`');
  let bean = pjs.query('SELECT * FROM `cbot_bean_chris--cme_s1`');
  let meal = pjs.query('SELECT * FROM `cbot_meal_chris--cme_sm1`');
  let oats = pjs.query('SELECT * FROM `cbot_oats_chris--cme_o1`');
  let oils = pjs.query('SELECT * FROM `cbot_oils_chris--cme_bo1`');
  let rice = pjs.query('SELECT * FROM `cbot_rice_chris--cme_rr1`');
  let whet = pjs.query('SELECT * FROM `cbot_wheat_chris--cme_w1`');

  // Set initial values.
  week_of = corn[0].date;
  cbot_corn = corn[0].open.toFixed(2);
  cbot_corn_change = corn[0].change.toFixed(2);
  base_corn = corn[0].settle.toFixed(2);
  base_corn_change = (corn[0].last - base_corn).toFixed(2);
  cbot_soy = bean[0].open.toFixed(2);
  cbot_soy_change = bean[0].change.toFixed(2);
  base_soy = bean[0].settle.toFixed(2);
  base_soy_change = (bean[0].last - base_soy).toFixed(2);
  let error = false;
  // Main program loop.
  while (!close) {
    // Get data from NASDAQ API.
    // var response = pjs.sendRequest({
    //   method: "get",
    //   uri: 
    // });
    error = false;

    feed_mill = 'Atwater';
    

    if (cbot_corn_change < 0) {
      cbot_corn_change_icon = 'material:arrow_downward';
      cbot_corn_change_icon_color = '#379E90';
    } else {
      cbot_corn_change_icon = 'material:arrow_upward';
      cbot_corn_change_icon_color = '#BC5B57';
    }

    if (base_corn_change < 0) {
      base_corn_change_icon = 'material:arrow_downward';
      base_corn_change_icon_color = '#379E90';
    } else {
      base_corn_change_icon = 'material:arrow_upward';
      base_corn_change_icon_color = '#BC5B57';
    }

    if (cbot_soy_change < 0) {
      cbot_soy_change_icon = 'material:arrow_downward';
      cbot_soy_change_icon_color = '#379E90';
    } else {
      cbot_soy_change_icon = 'material:arrow_upward';
      cbot_soy_change_icon_color = '#BC5B57';
    }

    if (base_soy_change < 0) {
      base_soy_change_icon = 'material:arrow_downward';
      base_soy_change_icon_color = '#379E90';
    } else {
      base_soy_change_icon = 'material:arrow_upward';
      base_soy_change_icon_color = '#BC5B57';
    }

    console.log(corn[0]);
    // console.log(soybeans);

    // Display the screen. 
    display.exchangeDialog.execute();

    if (week_of) {
      let ncorn = pjs.query('SELECT * FROM `cbot_corn_chris--cme_c1` where date=cast(\'' + week_of.toISOString() + '\' as datetime)');
      let nbean = pjs.query('SELECT * FROM `cbot_bean_chris--cme_s1` where date=cast(\'' + week_of.toISOString() + '\' as datetime)');
      // console.log(week_of.toISOString(), corn, bean);
      if (ncorn[0]) {
        week_of = ncorn[0].date;
        cbot_corn = ncorn[0].open.toFixed(2);
        cbot_corn_change = ncorn[0].change.toFixed(2);
        base_corn = ncorn[0].settle.toFixed(2);
        base_corn_change = (ncorn[0].last - base_corn).toFixed(2);
      } else {
        week_of = corn[0].date;
        error = true;
        cbot_corn = '0';
        cbot_corn_change = '0';
        base_corn = '0';
        base_corn_change = '0';
      }
      if (nbean[0]) {
        cbot_soy = nbean[0].open.toFixed(2);
        cbot_soy_change = nbean[0].change.toFixed(2);
        base_soy = nbean[0].settle.toFixed(2);
        base_soy_change = (nbean[0].last - base_soy).toFixed(2);
      } else {
        week_of = corn[0].date;
        error = true;
        cbot_soy = '0';
        cbot_soy_change = '0';
        base_soy = '0';
        base_soy_change = '0';
      }
      if (error) error_out = 'Date was not found for one or more commodities.';
    }
  }

}

exports.default = exchange;
