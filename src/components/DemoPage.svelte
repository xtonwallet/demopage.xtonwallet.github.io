<script>
  import "./Styles.svelte";
  import { Container, Input, Field, Details, Row, Col, Button } from "svelte-chota";
  import Loading from "./Loading.svelte";

  export let loaded;

  const allPermissions = [
    "ton_account",
    "ton_endpoint",
    "ton_sendTransaction",
    "ton_sendRawTransaction",
    "ton_signMessage",
    "ton_getSignature",
    "ton_subscribe",
    "ton_unsubscribe",
    "ton_getNaclBoxPublicKey",
    "ton_encryptMessage",
    "ton_decryptMessage",
    "wallet_watchAsset",
  ];

  const wallet_getSdkVersion = (event) => {
    const wallet_getSdkVersion_output = document.getElementById(
      "wallet_getSdkVersion_output"
    );

    window.ton
      .request({
        method: "wallet_getSdkVersion",
        params: {},
      })
      .then((result) => {
        wallet_getSdkVersion_output.innerText = JSON.stringify(result);
      })
      .catch((result) => {
        wallet_getSdkVersion_output.innerText = JSON.stringify(result);
      });
  };

  const wallet_requestPermissions = (event) => {
    const wallet_requestPermissions_output = document.getElementById(
      "wallet_requestPermissions_output"
    );

    window.ton
      .request({
        method: "wallet_requestPermissions",
        params: { permissions: allPermissions },
      })
      .then((result) => {
        wallet_requestPermissions_output.innerText = JSON.stringify(result);
      })
      .catch((result) => {
        wallet_requestPermissions_output.innerText = JSON.stringify(result);
      });
  };

  const wallet_getPermissions = async (event) => {
    const wallet_getPermissions_output = document.getElementById(
      "wallet_getPermissions_output"
    );

    window.ton
      .request({
        method: "wallet_getPermissions",
        params: {},
      })
      .then((result) => {
        wallet_getPermissions_output.innerText = JSON.stringify(result);
      })
      .catch((result) => {
        wallet_getPermissions_output.innerText = JSON.stringify(result);
      });
  };

  const ton_account = (event) => {
    const ton_account_output = document.getElementById("ton_account_output");

    window.ton
      .request({
        method: "ton_account",
        params: {},
      })
      .then((result) => {
        ton_account_output.innerText = JSON.stringify(result);
      })
      .catch((result) => {
        ton_account_output.innerText = JSON.stringify(result);
      });
  };

  const ton_endpoint = (event) => {
    const ton_endpoint_output = document.getElementById("ton_endpoint_output");

    window.ton
      .request({
        method: "ton_endpoint",
        params: {},
      })
      .then((result) => {
        ton_endpoint_output.innerText = JSON.stringify(result);
      })
      .catch((result) => {
        ton_endpoint_output.innerText = JSON.stringify(result);
      });
  };

  const ton_sendTransaction = (event) => {
    const ton_sendTransaction_output = document.getElementById(
      "ton_sendTransaction_output"
    );

    window.ton
      .request({
        method: "ton_sendTransaction",
        params: {
          token: document.getElementById("ton_sendTransaction_token").value,
          destination: document.getElementById(
            "ton_sendTransaction_destination"
          ).value,
          amount: Number(
            document.getElementById("ton_sendTransaction_amount").value
          ).valueOf(),
          message: document.getElementById("ton_sendTransaction_message").value,
        },
      })
      .then((result) => {
        ton_sendTransaction_output.innerText = JSON.stringify(result);
      })
      .catch((result) => {
        ton_sendTransaction_output.innerText = JSON.stringify(result);
      });
  };

  const ton_sendRawTransaction = (event) => {
    const ton_sendRawTransaction_output = document.getElementById(
      "ton_sendRawTransaction_output"
    );

    window.ton
      .request({
        method: "ton_sendRawTransaction",
        params: {
          to: document.getElementById("ton_sendRawTransaction_to").value,
          amount: Number(
            document.getElementById("ton_sendRawTransaction_amount").value
          ).valueOf(),
          data: document.getElementById("ton_sendRawTransaction_data").value,
          dataType: document.getElementById("ton_sendRawTransaction_dataType").value,
          stateInit: document.getElementById("ton_sendRawTransaction_stateInit").value,
        },
      })
      .then((result) => {
        ton_sendRawTransaction_output.innerText = JSON.stringify(result);
      })
      .catch((result) => {
        ton_sendRawTransaction_output.innerText = JSON.stringify(result);
      });
  };

  const ton_signMessage = (event) => {
    const ton_signMessage_output = document.getElementById(
      "ton_signMessage_output"
    );

    window.ton
      .request({
        method: "ton_signMessage",
        params: { data: document.getElementById("ton_signMessage_data").value },
      })
      .then((result) => {
        ton_signMessage_output.innerText = JSON.stringify(result);
      })
      .catch((result) => {
        ton_signMessage_output.innerText = JSON.stringify(result);
      });
  };

  const ton_getNaclBoxPublicKey = (event) => {
    const ton_getNaclBoxPublicKey_output = document.getElementById(
      "ton_getNaclBoxPublicKey_output"
    );

    window.ton
      .request({
        method: "ton_getNaclBoxPublicKey",
        params: {},
      })
      .then((result) => {
        ton_getNaclBoxPublicKey_output.innerText = JSON.stringify(result);
      })
      .catch((result) => {
        ton_getNaclBoxPublicKey_output.innerText = JSON.stringify(result);
      });
  };

  const ton_getSignature = (event) => {
    const ton_getSignature_output = document.getElementById(
      "ton_getSignature_output"
    );

    window.ton
      .request({
        method: "ton_getSignature",
        params: {
          data: document.getElementById("ton_getSignature_data").value,
        },
      })
      .then((result) => {
        ton_getSignature_output.innerText = JSON.stringify(result);
      })
      .catch((result) => {
        ton_getSignature_output.innerText = JSON.stringify(result);
      });
  };

  const ton_crypto_generate_random_bytes = (event) => {
    const ton_crypto_generate_random_bytes_output = document.getElementById(
      "ton_crypto_generate_random_bytes_output"
    );

    window.ton
      .request({
        method: "ton_crypto_generate_random_bytes",
        params: {
          length: Number(
            document.getElementById("ton_crypto_generate_random_bytes_length")
              .value
          ).valueOf(),
        },
      })
      .then((result) => {
        ton_crypto_generate_random_bytes_output.innerText = JSON.stringify(
          result
        );
      })
      .catch((result) => {
        ton_crypto_generate_random_bytes_output.innerText = JSON.stringify(
          result
        );
      });
  };

  const ton_encryptMessage = (event) => {
    const ton_encryptMessage_output = document.getElementById(
      "ton_encryptMessage_output"
    );

    window.ton
      .request({
        method: "ton_encryptMessage",
        params: {
          decrypted: document.getElementById("ton_encryptMessage_decrypted")
            .value,
          nonce: document.getElementById("ton_encryptMessage_nonce").value,
          their_public: document.getElementById(
            "ton_encryptMessage_their_public"
          ).value,
        },
      })
      .then((result) => {
        ton_encryptMessage_output.innerText = JSON.stringify(result);
      })
      .catch((result) => {
        ton_encryptMessage_output.innerText = JSON.stringify(result);
      });
  };

  const ton_decryptMessage = (event) => {
    const ton_decryptMessage_output = document.getElementById(
      "ton_decryptMessage_output"
    );

    window.ton
      .request({
        method: "ton_decryptMessage",
        params: {
          encrypted: document.getElementById("ton_decryptMessage_encrypted")
            .value,
          nonce: document.getElementById("ton_decryptMessage_nonce").value,
          their_public: document.getElementById(
            "ton_decryptMessage_their_public"
          ).value,
        },
      })
      .then((result) => {
        ton_decryptMessage_output.innerText = JSON.stringify(result);
      })
      .catch((result) => {
        ton_decryptMessage_output.innerText = JSON.stringify(result);
      });
  };

  const wallet_watchAsset = (event) => {
    const wallet_watchAsset_output = document.getElementById(
      "wallet_watchAsset_output"
    );

    window.ton
      .request({
        method: "wallet_watchAsset",
        params: {
          name: document.getElementById("wallet_watchAsset_name").value,
          symbol: document.getElementById("wallet_watchAsset_symbol").value,
          decimals: Number(document.getElementById("wallet_watchAsset_decimals").value).valueOf(),
          address: document.getElementById("wallet_watchAsset_address").value,
          icon: document.getElementById("wallet_watchAsset_icon").value,
          type: document.getElementById("wallet_watchAsset_type").value,
        },
      })
      .then((result) => {
        wallet_watchAsset_output.innerText = JSON.stringify(result);
      })
      .catch((result) => {
        wallet_watchAsset_output.innerText = JSON.stringify(result);
      });
  };

  const ton_subscribe = (event) => {
    const ton_subscribe_output = document.getElementById(
      "ton_subscribe_output"
    );

    window.ton
      .request({
        method: "ton_subscribe",
        params: {
          address: document.getElementById("ton_subscribe_address").value,
        },
      })
      .then((result) => {
        ton_subscribe_output.innerText = JSON.stringify(result);
      })
      .catch((result) => {
        ton_subscribe_output.innerText = JSON.stringify(result);
      });
  };

  const ton_unsubscribe = (event) => {
    const ton_unsubscribe_output = document.getElementById(
      "ton_unsubscribe_output"
    );

    window.ton
      .request({
        method: "ton_unsubscribe",
        params: {
          address: document.getElementById("ton_unsubscribe_address").value,
        },
      })
      .then((result) => {
        ton_unsubscribe_output.innerText = JSON.stringify(result);
      })
      .catch((result) => {
        ton_unsubscribe_output.innerText = JSON.stringify(result);
      });
  };

  const enable_listening_message = (event) => {
    const listening_message_output = document.getElementById(
      "listening_message_output"
    );

    window.ton.on("message", function(event) {
      listening_message_output.innerText += JSON.stringify(event) + "\n";
    });
  };

  const disable_listening_message = (event) => {
    const listening_message_output = document.getElementById(
      "listening_message_output"
    );

    window.ton.off("message");
    listening_message_output.innerText = '';
  };

  const enable_listening_endpointChanged = (event) => {
    const listening_endpointChanged_output = document.getElementById(
      "listening_endpointChanged_output"
    );

    window.ton.on("endpointChanged", function(event) {
      listening_endpointChanged_output.innerText += JSON.stringify(event) + "\n";
    });
  };

  const disable_listening_endpointChanged = (event) => {
    const listening_endpointChanged_output = document.getElementById(
      "listening_endpointChanged_output"
    );

    window.ton.off("endpointChanged");
    listening_endpointChanged_output.innerText = '';
  };

  const enable_listening_unlockStateChanged = (event) => {
    const listening_unlockStateChanged_output = document.getElementById(
      "listening_unlockStateChanged_output"
    );

    window.ton.on("unlockStateChanged", function(event) {
      listening_unlockStateChanged_output.innerText += JSON.stringify(event) + "\n";
    });
  };

  const disable_listening_unlockStateChanged = (event) => {
    const listening_unlockStateChanged_output = document.getElementById(
      "listening_unlockStateChanged_output"
    );

    window.ton.off("unlockStateChanged");
    listening_unlockStateChanged_output.innerText = '';
  };

  const enable_listening_accountChanged = (event) => {
    const listening_accountChanged_output = document.getElementById(
      "listening_accountChanged_output"
    );

    window.ton.on("accountChanged", function(event) {
      listening_accountChanged_output.innerText += JSON.stringify(event) + "\n";
    });
  };

  const disable_listening_accountChanged = (event) => {
    const listening_accountChanged_output = document.getElementById(
      "listening_accountChanged_output"
    );

    window.ton.off("accountChanged");
    listening_accountChanged_output.innerText = '';
  };
</script>

<style>
  .container {
    display: flex;
    padding-top: 2rem !important;
    flex-grow: 1;
    flex-direction: column;
  }
  .break-all {
    word-break: break-all;
    background-color: #efefef;
    padding: 1rem;
    font-weight: 600;
    border-radius: 4px;
  }
  :global(.container_methods input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="color"]):not([type="button"]):not([type="reset"]), 
          .container_methods select, 
          .container_methods textarea, 
          .container_methods textarea[type="text"]) {
    width: 95%;
  }
  .brand img {
    width: 100px;
    height: auto;
    max-height: initial;
  }
  .main-container {
    min-height: 75vh;
  }
</style>

<nav class="nav">
  <div class="nav-left">
    <a href="https://xtonwallet.com" class="brand">
      <img
        alt="XTON wallet"
        title="XTON wallet"
        src="/assets/img/icon-128.png" />
    </a>
  </div>
  <div class="nav-center">
    <h4 class="text-center">
      Demo page to test a browser wallet extension on TON blockchain Web3 compatibility
    </h4>
  </div>
  <div class="nav-right"></div>
</nav>

<div class="container">
  {#if $loaded}
    <div class="main-container">
      <Row>
        <Col class="container_methods">

          <Details>
            <span slot="summary">wallet_getSdkVersion</span>
            <Field>
              <Button success on:click={wallet_getSdkVersion}>Get SDK version</Button>
            </Field>
            <Field>
              <div class="break-all" id="wallet_getSdkVersion_output" />
            </Field>
          </Details>

          <Details>
            <span slot="summary">wallet_requestPermissions</span>
            <Field>
              <Button success on:click={wallet_requestPermissions}>
                Request permissions
              </Button>
            </Field>
            <Field>
              <div class="break-all" id="wallet_requestPermissions_output" />
            </Field>
          </Details>

          <Details>
            <span slot="summary">wallet_getPermissions</span>
            <Field>
              <Button success on:click={wallet_getPermissions}>
                Get permissions
              </Button>
            </Field>
            <Field>
              <div class="break-all" id="wallet_getPermissions_output" />
            </Field>
          </Details>

          <Details>
            <span slot="summary">ton_account</span>
            <Field>
              <Button success on:click={ton_account}>Get current account</Button>
            </Field>
            <Field>
              <div class="break-all" id="ton_account_output" />
            </Field>
          </Details>

          <Details>
            <span slot="summary">ton_endpoint</span>
            <Field>
              <Button success on:click={ton_endpoint}>Get current endpoint</Button>
            </Field>
            <Field>
              <div class="break-all" id="ton_endpoint_output" />
            </Field>
          </Details>

          <Details>
            <span slot="summary">ton_sendTransaction</span>
            <Field label="Destination">
              <Input id="ton_sendTransaction_destination" />
              <p>
                You can select another account in your wallet and send between own
                accounts.
              </p>
            </Field>
            <Field label="Token">
              <Input id="ton_sendTransaction_token" value="native" />
              <p>You can send "native" token or specify a root token address.</p>
            </Field>
            <Field label="Amount">
              <Input id="ton_sendTransaction_amount" type="number" />
              <p>You can use decimal number.</p>
            </Field>
            <Field label="Message">
              <Input id="ton_sendTransaction_message" />
              <p>
                This field is not required, but can be used for providing order ID or
                some additional information.
              </p>
            </Field>
            <Field>
              <Button success on:click={ton_sendTransaction}>
                Ton send transaction
              </Button>
            </Field>
            <Field>
              <div class="break-all" id="ton_sendTransaction_output" />
            </Field>
          </Details>

          <Details>
            <span slot="summary">ton_sendRawTransaction</span>
            <Field label="To">
              <Input id="ton_sendRawTransaction_to" />
              <p>Specify destination address.</p>
            </Field>
            <Field label="Amount">
              <Input id="ton_sendRawTransaction_amount" type="number" />
              <p>You can use decimal number.</p>
            </Field>
            <Field label="Data">
              <Input id="ton_sendRawTransaction_data" />
              <p>Data to send with transaction.</p>
            </Field>
            <Field label="Data type">
              <select id="ton_sendRawTransaction_dataType">
                <option value="boc">boc</option>
                <option value="hex">hex</option>
                <option value="base64">base64</option>
                <option value="text">text</option>
              </select>
            </Field>
            <Field label="State init">
              <Input id="ton_sendRawTransaction_stateInit" />
              <p>Need to use preformed boc</p>
            </Field>
            <Field>
              <Button success on:click={ton_sendRawTransaction}>
                Ton send raw transaction
              </Button>
            </Field>
            <Field>
              <div class="break-all" id="ton_sendRawTransaction_output" />
            </Field>
          </Details>

          <Details>
            <span slot="summary">ton_signMessage</span>
            <Field label="Data">
              <Input id="ton_signMessage_data" />
              <p>Specify data for the signing process.</p>
            </Field>
            <Field>
              <Button success on:click={ton_signMessage}>Sign message</Button>
            </Field>
            <Field>
              <div class="break-all" id="ton_signMessage_output" />
            </Field>
          </Details>

          <Details>
            <span slot="summary">ton_getNaclBoxPublicKey</span>
            <Field>
              <Button success on:click={ton_getNaclBoxPublicKey}>
                Get nacl box public key
              </Button>
            </Field>
            <Field>
              <div class="break-all" id="ton_getNaclBoxPublicKey_output" />
            </Field>
          </Details>

          <Details>
            <span slot="summary">ton_getSignature</span>
            <Field label="Data">
              <Input id="ton_getSignature_data" />
              <p>Specify data for which need to receive signature.</p>
            </Field>
            <Field>
              <Button success on:click={ton_getSignature}>Get signature</Button>
            </Field>
            <Field>
              <div class="break-all" id="ton_getSignature_output" />
            </Field>
          </Details>

          <Details>
            <span slot="summary">ton_crypto_generate_random_bytes</span>
            <Field label="Length">
              <Input id="ton_crypto_generate_random_bytes_length" type="number" />
            </Field>
            <Field>
              <Button success on:click={ton_crypto_generate_random_bytes}>
                Crypto generate random bytes
              </Button>
            </Field>
            <Field>
              <div class="break-all" id="ton_crypto_generate_random_bytes_output" />
            </Field>
          </Details>

          <Details>
            <span slot="summary">ton_encryptMessage</span>
            <Field label="Decrypted">
              <Input id="ton_encryptMessage_decrypted" />
              <p>Message that you want to encrypt</p>
            </Field>
            <Field label="Nonce">
              <Input id="ton_encryptMessage_nonce" />
              <p>Maybe convenient to get this from ton_crypto_generate_random_bytes</p>
            </Field>
            <Field label="Their public">
              <Input id="ton_encryptMessage_their_public" />
              <p>Public key of counterparty</p>
            </Field>
            <Field>
              <Button success on:click={ton_encryptMessage}>Encrypt message</Button>
            </Field>
            <Field>
              <div class="break-all" id="ton_encryptMessage_output" />
            </Field>
          </Details>

          <Details>
            <span slot="summary">ton_decryptMessage</span>
            <Field label="Encrypted">
              <Input id="ton_decryptMessage_encrypted" />
              <p>Message that you want to decrypt</p>
            </Field>
            <Field label="Nonce">
              <Input id="ton_decryptMessage_nonce" />
              <p>You must to use the same nonce as for ton_encryptMessage</p>
            </Field>
            <Field label="Their public">
              <Input id="ton_decryptMessage_their_public" />
              <p>Public key of counterparty</p>
            </Field>
            <Field>
              <Button success on:click={ton_decryptMessage}>Decrypt message</Button>
            </Field>
            <Field>
              <div class="break-all" id="ton_decryptMessage_output" />
            </Field>
          </Details>

          <Details>
            <span slot="summary">wallet_watchAsset</span>
            <Field label="Name">
              <Input id="wallet_watchAsset_name" />
            </Field>
            <Field label="Symbol">
              <Input id="wallet_watchAsset_symbol" />
            </Field>
            <Field label="Decimals">
              <Input id="wallet_watchAsset_decimals" type="number" />
            </Field>
            <Field label="Address">
              <Input id="wallet_watchAsset_address" />
            </Field>
            <Field label="Icon">
              <Input id="wallet_watchAsset_icon" />
            </Field>
            <Field label="Type">
              <select id="wallet_watchAsset_type">
                <option value="74">Jetton</option>
                <option value="64">NFT</option>
                <option value="81">DNS</option>
              </select>
            </Field>
            <Field>
              <Button success on:click={wallet_watchAsset}>Wallet watch asset</Button>
            </Field>
            <Field>
              <div class="break-all" id="wallet_watchAsset_output" />
            </Field>
          </Details>
  
          <Details>
            <span slot="summary">ton_subscribe</span>
            <Field label="Address">
              <Input id="ton_subscribe_address" />
            </Field>
            <Field>
              <Button success on:click={ton_subscribe}>Subscribe by address</Button>
            </Field>
            <Field>
              <div class="break-all" id="ton_subscribe_output" />
            </Field>
          </Details>

          <Details>
            <span slot="summary">ton_unsubscribe</span>
            <Field label="Address">
              <Input id="ton_unsubscribe_address" />
            </Field>
            <Field>
              <Button success on:click={ton_unsubscribe}>Unsubscribe by address</Button>
            </Field>
            <Field>
              <div class="break-all" id="ton_unsubscribe_output" />
            </Field>
          </Details>

        </Col>
        <Col>
          <Details>
            <span slot="summary">Listen events "message"</span>
            <Field>
              <Button success on:click={enable_listening_message}>Enable listening</Button>
            </Field>
            <Field>
              <Button success on:click={disable_listening_message}>Disable listening</Button>
            </Field>
            <Field>
              <div class="break-all" id="listening_message_output" />
            </Field>
          </Details>

          <Details>
            <span slot="summary">Listen events "endpointChanged"</span>
            <Field>
              <Button success on:click={enable_listening_endpointChanged}>Enable listening</Button>
            </Field>
            <Field>
              <Button success on:click={disable_listening_endpointChanged}>Disable listening</Button>
            </Field>
            <Field>
              <div class="break-all" id="listening_endpointChanged_output" />
            </Field>
          </Details>

          <Details>
            <span slot="summary">Listen events "unlockStateChanged"</span>
            <Field>
              <Button success on:click={enable_listening_unlockStateChanged}>Enable listening</Button>
            </Field>
            <Field>
              <Button success on:click={disable_listening_unlockStateChanged}>Disable listening</Button>
            </Field>
            <Field>
              <div class="break-all" id="listening_unlockStateChanged_output" />
            </Field>
          </Details>

          <Details>
            <span slot="summary">Listen events "accountChanged"</span>
            <Field>
              <Button success on:click={enable_listening_accountChanged}>Enable listening</Button>
            </Field>
            <Field>
              <Button success on:click={disable_listening_accountChanged}>Disable listening</Button>
            </Field>
            <Field>
              <div class="break-all" id="listening_accountChanged_output" />
            </Field>
          </Details>
        </Col>
      </Row>
    </div>
    <Container>
      <Row class="is-center footer">
        <Col size="2" class="is-center">2021-{new Date().getFullYear()}</Col>
        <Col size="8" class="is-center">
          {'Made by'}
          &nbsp;<a
            target="_blank"
            class="footer-made"
            href="{"#"}">{'XTON wallet team'}</a>&nbsp;
          {'with'}
          &#10084;&#65039;
        </Col>
        <Col size="2" class="is-center"><a href="/">{'Support'}</a></Col>
      </Row>
    </Container>
  {:else}
    <Loading />
  {/if}
</div>