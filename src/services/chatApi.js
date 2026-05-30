// API URLs Configuration
export const API_URLS = {
  pythonApi: 'https://neurax-python-be-emhfejathhhpe6h3.uksouth-01.azurewebsites.net',
  dotnetApi: 'https://neurax-net-f2cwbugzh4gqd8hg.uksouth-01.azurewebsites.net'
};

// Direct widget ID
export const WIDGET_ID = '1ebbc490-8276-43d1-894f-6d5987e17006';

// Get widget registration by web URL
export async function getWidgetRegistration(webUrl) {
  try {
    const response = await fetch(`${API_URLS.dotnetApi}/Registration_NoKey/GetWidgetKeyByWebUrl?webUrl=${encodeURIComponent(webUrl)}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Returns { WidgetWebUrlId, WidgetKey }
  } catch (error) {
    console.error('Error fetching widget registration:', error);
    return null;
  }
}

// Fetch chat response
export async function fetchImprovedChatResponse(message, sessionId, chatbotId = null, apiBaseUrl = '') {
  const requestPayload = {
    message: message,
    session_id: sessionId ?? '',
    index_name: 'default'
  };

  const headers = {
    'Content-Type': 'application/json',
    accept: 'application/json',
  };

  if (chatbotId) {
    headers['x-widget-key'] = chatbotId;
  }

  const response = await fetch(`${apiBaseUrl}/nexus/ai/widget/chat`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestPayload),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Save reaction
export async function saveReaction(sessionId, messageId, reaction, chatbotId = null, apiBaseUrl = '') {
  const requestPayload = {
    session_id: sessionId,
    message_id: parseInt(messageId),
    reaction: reaction
  };

  const headers = {
    'Content-Type': 'application/json',
    accept: 'application/json',
  };

  if (chatbotId) {
    headers['x-widget-key'] = chatbotId;
  }

  const response = await fetch(`${apiBaseUrl}/nexus/ai/widget/chat/reaction`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestPayload),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Get clinic settings
export async function getClinicSettings(chatbotId = null) {
  const headers = { accept: 'text/plain' };
  if (chatbotId) headers['x-widget-key'] = chatbotId;

  const response = await fetch(`${API_URLS.dotnetApi}/Settings_Widget/Get`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

// Get starter questions
export async function getStarterQuestions(chatbotId = null) {
  const headers = { accept: 'text/plain' };
  if (chatbotId) headers['x-widget-key'] = chatbotId;

  const response = await fetch(`${API_URLS.dotnetApi}/StarterQuestions_Widget/Get`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

// Get doctor details
export async function getDoctorDetails(chatbotId = null) {
  const headers = { accept: 'text/plain' };
  if (chatbotId) headers['x-widget-key'] = chatbotId;

  const response = await fetch(`${API_URLS.dotnetApi}/DoctorDetails_Widget/Get`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

// Fetch user IP
export async function fetchUserIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || '127.0.0.1';
  } catch {
    return '127.0.0.1';
  }
}

// Send email
export async function sendEmail(name, email, message, chatbotId = null, bookNowClicksId = null) {
  const requestPayload = {
    Name: name,
    ContactPersonEmail: email,
    Message: message,
    BookNowClicksId: bookNowClicksId || ''
  };

  const headers = {
    'Content-Type': 'application/json',
    accept: 'application/json',
  };

  if (chatbotId) {
    headers['x-widget-key'] = chatbotId;
  }

  const response = await fetch(`${API_URLS.dotnetApi}/SendAnEmail_Widget/SendMail`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestPayload),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.text();
}

// Insert user chat session
export async function insertUserChatSession(userIP, chatbotId, widgetWebUrlId = null) {
  const headers = {
    'Content-Type': 'application/json',
    accept: 'text/plain',
  };
  if (chatbotId) headers['x-widget-key'] = chatbotId;

  const response = await fetch(`${API_URLS.dotnetApi}/UserChatSession_Widget/Insert`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      IPAddress: userIP,
      SessionStartTime: new Date().toISOString(),
      WidgetWebUrlId: widgetWebUrlId || ''
    }),
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const sessionId = await response.text();
  return sessionId.trim();
}

// Track button click
export async function trackButtonClick(userChatSessionId, buttonLabel, chatbotId = null) {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = now.toLocaleString('en', { month: 'short' });
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const timestamp = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

  const headers = {
    'Content-Type': 'application/json',
    accept: 'text/plain',
  };
  if (chatbotId) headers['x-widget-key'] = chatbotId;

  const response = await fetch(`${API_URLS.dotnetApi}/BookNowClicks_Widget/Insert`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      UserChatSessionId: userChatSessionId,
      Click: buttonLabel,
      Timestamp: timestamp
    }),
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.text();
  return data.trim();
}
