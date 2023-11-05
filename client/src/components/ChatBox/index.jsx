import style from "./styles.module.css";

const ChatBox = ({ showChat, avatar }) => {
  return (
    <section className={style.chatBox}>
      <section className={style.chatTab}>
        <div className={style.tabTitleGroup}>
          <>
            <img
              className={style.tabAvatar}
              src={avatar}
              alt="Tom Tobar Avatar"
            />
            <h3 className={style.tabTitle}>Tom Tobar</h3>
            <div className={style.onlineIndicator}></div>
          </>
        </div>
        <span className={style.chatCloseBtn}>close</span>
      </section>
      <section className={style.mainChat}>Messages will diplay here!</section>
      <section className={style.chatInputGroup}>
        <input className={style.chatInput} type="text" />
        <input type="submit" value="send" />
      </section>
    </section>
  );
};

export default ChatBox;
