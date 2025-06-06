import { ref } from 'vue';

const rootStyle = {
  background: '#F7F7FC',
};

const messagesStyle = ref({
  outgoing: {
    root: {
      background: '#DBD7F4',
      color: '#11142D',
    },
    author: {
      color: '#5541D7',
    },
    time: {
      color: '#9A9AB0',
    },
  },
  incoming: {
    root: {
      background: '#FFFFFF',
      color: '#11142D',
    },
    author: {
      color: '#5541D7',
    },
    time: {
      color: '#9A9AB0',
    },
  },
});

export const useTheme = () => {
  const messageStyle = (authorType) => {
    if (authorType === 'respondent') return messagesStyle.value.outgoing;
    return messagesStyle.value.incoming;
  };

  function setupTheme(data) {
    if (!data || !Array.isArray(data)) return;
    data.forEach(item => {
      switch (item.code) {
        case 'base_background':
          rootStyle.background = item.value;
          break;
        case 'message_outgoing_background':
          messagesStyle.value.outgoing.root.background = item.value;
          break;
        case 'message_outgoing_color':
          messagesStyle.value.outgoing.root.color = item.value;
          break;
        case 'message_outgoing_author':
          messagesStyle.value.outgoing.author.color = item.value;
          break;
        case 'message_outgoing_time':
          messagesStyle.value.outgoing.time.color = item.value;
          break;
        case 'message_incoming_background':
          messagesStyle.value.incoming.root.background = item.value;
          break;
        case 'message_incoming_color':
          messagesStyle.value.incoming.root.color = item.value;
          break;
        case 'message_incoming_author':
          messagesStyle.value.incoming.author.color = item.value;
          break;
        case 'message_incoming_time':
          messagesStyle.value.incoming.time.color = item.value;
          break;
      }
    });
  }

  return {
    rootStyle,
    messageStyle,
    setupTheme,
  };
};
