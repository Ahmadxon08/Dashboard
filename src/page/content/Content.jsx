import "./Content.scss";

const ContentBody = () => {
  return (
    <div className="content">
      <section className="content_header">
        <div className="items">
          <div className="item">
            <label htmlFor="product">Product name:</label>
            <input type="text" />
          </div>

          <div className="item">
            <label htmlFor="produuct">Store name:</label>
            <input type="text" />
          </div>
        </div>
        <div className="items">
          <div className="item">
            <label htmlFor="product">Price:</label>
            <input type="text" />
          </div>

          <div className="item">
            <label htmlFor="produuct">Order By:</label>
            <input type="text" />
          </div>
        </div>
        <div className="items">
          <div className="item">
            <label htmlFor="product">...</label>
            <input type="text" />
          </div>

          <div className="item">
            <label htmlFor="produuct">...</label>
            <input type="text" />
          </div>
        </div>
        <div className="btn">
          <button>Search</button>
        </div>
      </section>
      <section className="content_body">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          beatae necessitatibus non neque quis aliquam sequi dignissimos animi
          porro atque, eveniet quaerat eius saepe dolor consequatur! Harum
          ratione facere natus magnam suscipit soluta nam voluptatibus eveniet
          delectus nesciunt ullam laborum explicabo quaerat alias, ad animi
          eligendi. Alias illo quasi quidem debitis quia dignissimos dolorem
          aperiam corrupti nesciunt vel hic praesentium soluta, maiores natus
          iste repellat eligendi accusantium fugit esse omnis dolores optio?
          Praesentium reprehenderit, exercitationem ipsa in id iure dolorum quam
          ratione, architecto ipsam assumenda illum. Vitae facilis culpa animi
          eveniet at magnam, officia alias. Recusandae nisi odio dolore ratione?
        </p>
      </section>
    </div>
  );
};

export default ContentBody;
