/* eslint-disable no-use-before-define */
$(document).ready(() => {
  $.ajax({
    method: 'GET',
    url: '/api/product',

  }).then((res) => {
    for (let i = 0; i < res.length; i += 1) {
      let trow = $('<tr>');
      let thNumber = $('<th>');
      let sku = $('<td>');
      let productName = $('<td>');
      let productDescr = $('<td>');
      let wholesale = $('<td>');
      let msrp = $('<td>');
      let productQuantity = $('<td>');
      thNumber.attr('scope', 'col');
      thNumber.text(i + 1);
      sku.text(res[i].sku);
      productName.text(res[i].name);
      productDescr.text(res[i].description);
      wholesale.text(res[i].currentPurchasePrice);
      msrp.text(res[i].currentSalePrice);
      productQuantity.text(res[i].inventoryQuantity);

      trow.append(thNumber);
      trow.append(sku);
      trow.append(productName);
      trow.append(productDescr);
      trow.append(wholesale);
      trow.append(msrp);
      trow.append(productQuantity);
      $('.currentInv').append(trow);
    }
    console.log(res);
  });

  // This event handler is activated when inside Inventory.handlebar
  // user click on newinventory button
  // this then it will take user to newInventory Page.
  $('#newInventory').click(() => {
    window.location.replace('/add/inventory');
  });

  //----------------------------------------------------------
  // Below is for the button within the newInventory.handlebar
  // Getting references to our form and inputs
  const newInvForm = $('form.newInventory');
  const skuInput = $('input#sku');
  const productNameInput = $('input#productName');
  const productDescInput = $('input#productDescription');
  const costInput = $('input#cost');
  const sellPriceInput = $('input#sellPrice');
  const quantityInput = $('input#quantity');

  // When the form is submitted, we validate there's an email and password entered

  newInvForm.on('submit', (event) => {
    event.preventDefault();

    const newInvData = {
      sku: skuInput.val().trim(),
      productName: productNameInput.val().trim(),
      productDesc: productDescInput.val().trim(),
      cost: costInput.val().trim(),
      sellPrice: sellPriceInput.val().trim(),
      quantity: quantityInput.val().trim(),
    };

    console.log('Submit clicked, new inv data is', newInvData);

    // Call addInventory function to add new inventory, and clear the form
    addInventory(newInvData);
    skuInput.val('');
    productNameInput.val('');
    productDescInput.val('');
    costInput.val('');
    sellPriceInput.val('');
    quantityInput.val('');
  });

  // newInventory does a post to our "api/login" route and if successful,
  // redirects us the the members page
  function addInventory(newInvData) {
    console.log('Inside addInventory function, passing object is:', newInvData);
    $.post('/api/product', {
      sku: newInvData.sku,
      name: newInvData.productName,
      description: newInvData.productDesc,
      currentPurchasePrice: newInvData.cost,
      currentSalePrice: newInvData.sellPrice,
      inventoryQuantity: newInvData.quantity,
      minRequirement: 0,
    })
      .then(() => {
        // For now back to add inventory page but we can update later to another page.
        window.location.replace('/inventory');
        // If there's an error, log the error
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
