"use client"

import { useState, useEffect } from "react"
import { translations } from "../src/translations"

// Sample conversations data
const conversationsData = [
  {
    id: 1,
    contactName: "أحمد محمد",
    contactNameEn: "Ahmed Mohammed",
    username: "@ahmed_tech",
    platform: "instagram" as const,
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "شكراً على المعلومات! متى يمكننا البدء؟",
    lastMessageEn: "Thanks for the info! When can we start?",
    timestamp: "2 mins ago",
    unread: true,
    unreadCount: 3,
    starred: false,
    temperature: "hot" as const,
    status: "online" as const,
    lastSeen: "منذ دقيقتين",
    autoReplied: false,
    tags: ["مهتم", "VIP"],
    email: "ahmed@example.com",
    phone: "+971 50 123 4567",
  },
  {
    id: 2,
    contactName: "Sarah Johnson",
    contactNameEn: "Sarah Johnson",
    username: "@sarahj_design",
    platform: "instagram" as const,
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Can you send me the pricing details?",
    lastMessageEn: "Can you send me the pricing details?",
    timestamp: "15 mins ago",
    unread: true,
    unreadCount: 1,
    starred: true,
    temperature: "warm" as const,
    status: "online" as const,
    lastSeen: "منذ 15 دقيقة",
    autoReplied: false,
    tags: ["Interested"],
    email: "sarah@example.com",
    phone: "+1 555 0102",
  },
  {
    id: 3,
    contactName: "فاطمة العلي",
    contactNameEn: "Fatima Al Ali",
    username: "@fatima_entrepreneur",
    platform: "facebook" as const,
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "تم الاستلام، شكراً!",
    lastMessageEn: "Received, thank you!",
    timestamp: "1 hour ago",
    unread: false,
    unreadCount: 0,
    starred: false,
    temperature: "warm" as const,
    status: "away" as const,
    lastSeen: "منذ ساعة",
    autoReplied: false,
    tags: ["Client"],
    email: "fatima@example.com",
    phone: "+971 50 234 5678",
  },
  {
    id: 4,
    contactName: "Mohammed Khalid",
    contactNameEn: "Mohammed Khalid",
    username: "@mkhalid_business",
    platform: "instagram" as const,
    avatar: "https://i.pravatar.cc/150?img=4",
    lastMessage: "مرحباً! أنا مهتم بخدماتكم",
    lastMessageEn: "Hi! I'm interested in your services",
    timestamp: "2 hours ago",
    unread: true,
    unreadCount: 2,
    starred: false,
    temperature: "cold" as const,
    status: "offline" as const,
    lastSeen: "منذ ساعتين",
    autoReplied: true,
    tags: ["New Lead"],
    email: "mohammed@example.com",
    phone: "+971 50 345 6789",
  },
  {
    id: 5,
    contactName: "Linda Martinez",
    contactNameEn: "Linda Martinez",
    username: "@linda_realestate",
    platform: "facebook" as const,
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Perfect! Let's schedule a call.",
    lastMessageEn: "Perfect! Let's schedule a call.",
    timestamp: "3 hours ago",
    unread: false,
    unreadCount: 0,
    starred: true,
    temperature: "hot" as const,
    status: "offline" as const,
    lastSeen: "منذ 3 ساعات",
    autoReplied: false,
    tags: ["Hot Lead", "Real Estate"],
    email: "linda@example.com",
    phone: "+1 555 0103",
  },
  {
    id: 6,
    contactName: "عمر السعيد",
    contactNameEn: "Omar Al Saeed",
    username: "@omar_startup",
    platform: "instagram" as const,
    avatar: "https://i.pravatar.cc/150?img=6",
    lastMessage: "شفت منشوركم الأخير - ممتاز!",
    lastMessageEn: "Saw your last post - excellent!",
    timestamp: "5 hours ago",
    unread: false,
    unreadCount: 0,
    starred: false,
    temperature: "warm" as const,
    status: "offline" as const,
    lastSeen: "منذ 5 ساعات",
    autoReplied: false,
    tags: ["Engaged"],
    email: "omar@example.com",
    phone: "+971 50 456 7890",
  },
  {
    id: 7,
    contactName: "Emma Wilson",
    contactNameEn: "Emma Wilson",
    username: "@emma_marketing",
    platform: "facebook" as const,
    avatar: "https://i.pravatar.cc/150?img=7",
    lastMessage: "Thanks! Will get back to you soon.",
    lastMessageEn: "Thanks! Will get back to you soon.",
    timestamp: "1 day ago",
    unread: false,
    unreadCount: 0,
    starred: false,
    temperature: "warm" as const,
    status: "offline" as const,
    lastSeen: "منذ يوم",
    autoReplied: false,
    tags: [],
    email: "emma@example.com",
    phone: "+1 555 0104",
  },
  {
    id: 8,
    contactName: "خالد الأحمد",
    contactNameEn: "Khalid Al Ahmad",
    username: "@khalid_tech",
    platform: "instagram" as const,
    avatar: "https://i.pravatar.cc/150?img=8",
    lastMessage: "أحتاج استشارة عن الموضوع",
    lastMessageEn: "I need consultation about this",
    timestamp: "2 days ago",
    unread: false,
    unreadCount: 0,
    starred: false,
    temperature: "cold" as const,
    status: "offline" as const,
    lastSeen: "منذ يومين",
    autoReplied: true,
    tags: ["Consultation"],
    email: "khalid@example.com",
    phone: "+971 50 567 8901",
  },
  {
    id: 9,
    contactName: "Jessica Lee",
    contactNameEn: "Jessica Lee",
    username: "@jessicalee_agency",
    platform: "facebook" as const,
    avatar: "https://i.pravatar.cc/150?img=9",
    lastMessage: "Interested in your automation package",
    lastMessageEn: "Interested in your automation package",
    timestamp: "3 days ago",
    unread: false,
    unreadCount: 0,
    starred: false,
    temperature: "warm" as const,
    status: "offline" as const,
    lastSeen: "منذ 3 أيام",
    autoReplied: false,
    tags: ["Automation"],
    email: "jessica@example.com",
    phone: "+1 555 0105",
  },
  {
    id: 10,
    contactName: "نورة العتيبي",
    contactNameEn: "Noura Al Otaibi",
    username: "@noura_events",
    platform: "instagram" as const,
    avatar: "https://i.pravatar.cc/150?img=10",
    lastMessage: "رائع! سأشارك مع فريقي",
    lastMessageEn: "Great! Will share with my team",
    timestamp: "1 week ago",
    unread: false,
    unreadCount: 0,
    starred: false,
    temperature: "cold" as const,
    status: "offline" as const,
    lastSeen: "منذ أسبوع",
    autoReplied: false,
    tags: ["Events"],
    email: "noura@example.com",
    phone: "+971 50 678 9012",
  },
]

// Sample messages for the selected conversation
const messagesData = [
  {
    id: 1,
    type: "incoming" as const,
    text: "مرحباً! شفت منشوركم عن خدمات الأتمتة",
    textEn: "Hi! Saw your post about automation services",
    timestamp: "10:30 AM",
    date: "Today",
    read: true,
    autoReply: false,
  },
  {
    id: 2,
    type: "incoming" as const,
    text: "ممكن معلومات أكثر؟",
    textEn: "Can I get more info?",
    timestamp: "10:31 AM",
    date: "Today",
    read: true,
    autoReply: false,
  },
  {
    id: 3,
    type: "outgoing" as const,
    text: "أهلاً وسهلاً! بالتأكيد، نقدم حلول أتمتة كاملة للتسويق عبر البريد ووسائل التواصل",
    textEn: "Hello! Sure, we provide complete automation solutions for email and social media marketing",
    timestamp: "10:35 AM",
    date: "Today",
    read: true,
    autoReply: true,
    sent: true,
    delivered: true,
  },
  {
    id: 4,
    type: "incoming" as const,
    text: "ممتاز! كم الأسعار؟",
    textEn: "Excellent! What are the prices?",
    timestamp: "10:40 AM",
    date: "Today",
    read: true,
    autoReply: false,
  },
  {
    id: 5,
    type: "outgoing" as const,
    text: "عندنا 3 باقات: Starter ($99/سنة)، Professional ($299/سنة)، وAgency ($699/سنة)",
    textEn: "We have 3 packages: Starter ($99/year), Professional ($299/year), and Agency ($699/year)",
    timestamp: "10:42 AM",
    date: "Today",
    read: true,
    autoReply: false,
    sent: true,
    delivered: true,
  },
  {
    id: 6,
    type: "incoming" as const,
    text: "شكراً على المعلومات! متى يمكننا البدء؟",
    textEn: "Thanks for the info! When can we start?",
    timestamp: "10:45 AM",
    date: "Today",
    read: false,
    autoReply: false,
  },
]

const quickReplies = [
  "شكراً على تواصلك! سنرد قريباً",
  "هل يمكنك إعطائي المزيد من التفاصيل؟",
  "ممتاز! دعني أرسل لك المعلومات",
  "هل يمكننا جدولة مكالمة؟",
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<(typeof conversationsData)[0] | null>(
    conversationsData[0],
  )
  const [filter, setFilter] = useState<"all" | "unread" | "starred" | "instagram" | "facebook">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [messageText, setMessageText] = useState("")
  const [showQuickReplies, setShowQuickReplies] = useState(false)
  const [messages, setMessages] = useState(messagesData)

  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const [language, setLanguage] = useState<'ar' | 'en'>((urlParams.get('lang') as 'ar' | 'en') || (typeof window !== 'undefined' ? localStorage.getItem('triggerio_language') as 'ar' | 'en' : null) || 'ar');

  useEffect(() => {
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.style.textAlign = language === 'ar' ? 'right' : 'left';
  }, [language]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'LANGUAGE_CHANGE') {
        setLanguage(event.data.language);
        localStorage.setItem('triggerio_language', event.data.language);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const t = translations[language];

  const filteredConversations = conversationsData
    .filter((conv) => {
      if (filter === "unread") return conv.unread
      if (filter === "starred") return conv.starred
      if (filter === "instagram") return conv.platform === "instagram"
      if (filter === "facebook") return conv.platform === "facebook"
      return true
    })
    .filter(
      (conv) =>
        conv.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const handleSendMessage = () => {
    if (!messageText.trim()) return

    const newMessage = {
      id: messages.length + 1,
      type: "outgoing" as const,
      text: messageText,
      textEn: messageText,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      date: "Today",
      read: false,
      autoReply: false,
      sent: true,
      delivered: false,
    }

    setMessages([...messages, newMessage])
    setMessageText("")
  }

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="h-screen flex bg-[#F3F4F6]">
      {/* LEFT COLUMN: Conversations List (30%) */}
      <div className="w-[30%] bg-white border-l border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t.pageTitle}
          </h1>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent text-right"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 p-4 overflow-x-auto border-b border-gray-200">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              filter === "all" ? "bg-[#7C3AED] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t.filterAll}
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              filter === "unread" ? "bg-[#7C3AED] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t.filterUnread}
          </button>
          <button
            onClick={() => setFilter("starred")}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              filter === "starred" ? "bg-[#7C3AED] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t.filterStarred}
          </button>
          <button
            onClick={() => setFilter("instagram")}
            className={`px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center gap-2 whitespace-nowrap ${
              filter === "instagram" ? "bg-[#7C3AED] text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Instagram
          </button>
          <button
            onClick={() => setFilter("facebook")}
            className={`px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center gap-2 whitespace-nowrap ${
              filter === "facebook" ? "bg-[#7C3AED] text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                conversation.unread ? "bg-purple-50" : "bg-white hover:bg-gray-50"
              } ${selectedConversation?.id === conversation.id ? "bg-purple-100 border-l-4 border-l-[#7C3AED]" : ""}`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar with status */}
                <div className="relative flex-shrink-0">
                  <img
                    src={conversation.avatar || "/placeholder.svg"}
                    alt={conversation.contactName}
                    className="w-12 h-12 rounded-full"
                  />
                  {conversation.status === "online" && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#10B981] border-2 border-white rounded-full"></span>
                  )}
                  {/* Platform badge */}
                  <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-gray-200">
                    {conversation.platform === "instagram" ? (
                      <svg className="w-3 h-3 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-sm font-semibold ${conversation.unread ? "text-gray-900" : "text-gray-700"}`}
                      >
                        {conversation.contactName}
                      </h3>
                      {conversation.temperature === "hot" && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">{t.tempHot}</span>
                      )}
                      {conversation.temperature === "warm" && (
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                          {t.tempWarm}
                        </span>
                      )}
                      {conversation.autoReplied && (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          {t.autoReplied}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>

                  <p
                    className={`text-sm ${conversation.unread ? "text-gray-900 font-medium" : "text-gray-600"} truncate mb-1`}
                  >
                    {conversation.lastMessage}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{conversation.username}</span>
                    <div className="flex items-center gap-2">
                      {conversation.starred && (
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      )}
                      {conversation.unread && conversation.unreadCount > 0 && (
                        <span className="px-2 py-0.5 bg-[#7C3AED] text-white rounded-full text-xs font-bold">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CENTER COLUMN: Message Thread (35%) */}
      <div className="w-[35%] bg-white border-l border-gray-200 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedConversation.avatar || "/placeholder.svg"}
                    alt={selectedConversation.contactName}
                    className="w-10 h-10 rounded-full"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-900">{selectedConversation.contactName}</h2>
                      {/* Platform badge */}
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium flex items-center gap-1">
                        {selectedConversation.platform === "instagram" ? (
                          <>
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                            </svg>
                            Instagram
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                          </>
                        )}
                      </span>
                      {/* Temperature badge */}
                      {selectedConversation.temperature === "hot" && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">{t.tempHot}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {selectedConversation.status === "online"
                        ? t.onlineNow
                        : `${t.lastSeen}: ${selectedConversation.lastSeen}`}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Date Separator */}
              <div className="flex items-center justify-center my-6">
                <span className="px-4 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-medium">
                  {t.today}
                </span>
              </div>

              {messages.map((message) => (
                <div key={message.id}>
                  {message.type === "incoming" ? (
                    <div className="flex items-start gap-2">
                      <img
                        src={selectedConversation.avatar || "/placeholder.svg"}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                        alt=""
                      />
                      <div className="max-w-[70%]">
                        <div className="bg-gray-100 rounded-2xl rounded-tr-none p-3">
                          <p className="text-gray-900 text-sm">{message.text}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                          {message.autoReply && (
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                              {t.autoReplied}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 justify-end">
                      <div className="max-w-[70%]">
                        <div className="bg-[#7C3AED] text-white rounded-2xl rounded-tl-none p-3">
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1 justify-end">
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                          {message.sent && !message.delivered && (
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                          {message.delivered && !message.read && (
                            <div className="flex">
                              <svg className="w-4 h-4 text-gray-400 -mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                          {message.read && (
                            <div className="flex">
                              <svg className="w-4 h-4 text-[#7C3AED] -mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <svg className="w-4 h-4 text-[#7C3AED]" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                      <img
                        src="https://i.pravatar.cc/150?img=20"
                        className="w-8 h-8 rounded-full flex-shrink-0"
                        alt=""
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Message Composer */}
            <div className="p-4 border-t border-gray-200">
              {/* Quick Replies */}
              <div className="mb-3">
                <button
                  onClick={() => setShowQuickReplies(!showQuickReplies)}
                  className="text-sm text-[#7C3AED] hover:text-[#6D28D9] font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t.quickReplies}
                </button>

                {showQuickReplies && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setMessageText(reply)
                          setShowQuickReplies(false)
                        }}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 text-right"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Main Composer */}
              <div className="flex items-end gap-2">
                {/* Attachment Button */}
                <button className="p-3 hover:bg-gray-100 rounded-lg flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>

                {/* Text Input */}
                <div className="flex-1 relative">
                  <textarea
                    placeholder={t.messagePlaceholder}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent resize-none text-right"
                    rows={1}
                    style={{ minHeight: "48px", maxHeight: "120px" }}
                  />
                  {/* Emoji Button */}
                  <button className="absolute left-3 bottom-3 p-1 hover:bg-gray-100 rounded">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Send Button */}
                <button
                  onClick={handleSendMessage}
                  className="p-3 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-2xl flex-shrink-0"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <svg className="w-24 h-24 text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.selectConversation}</h3>
            <p className="text-sm text-gray-600">{t.selectConversationDesc}</p>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Contact Info (35%) */}
      <div className="w-[35%] bg-white overflow-y-auto">
        {selectedConversation && (
          <>
            {/* Contact Header */}
            <div className="p-4 border-b border-gray-200 text-center">
              <img
                src={selectedConversation.avatar || "/placeholder.svg"}
                alt={selectedConversation.contactName}
                className="w-20 h-20 rounded-full mx-auto mb-3"
              />
              <h3 className="text-lg font-bold text-gray-900 mb-1">{selectedConversation.contactName}</h3>
              <p className="text-sm text-gray-600 mb-2">{selectedConversation.username}</p>

              {/* Temperature Badge */}
              {selectedConversation.temperature === "hot" && (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  {t.tempHot}
                </div>
              )}
              {selectedConversation.temperature === "warm" && (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7z" />
                  </svg>
                  {t.tempWarm}
                </div>
              )}
              {selectedConversation.temperature === "cold" && (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5z" />
                  </svg>
                  {t.tempCold}
                </div>
              )}
            </div>

            {/* Contact Details */}
            <div className="p-4 space-y-4">
              {/* Source */}
              <div>
                <div className="text-xs text-gray-500 mb-1">{t.source}</div>
                <div className="flex items-center gap-2">
                  {selectedConversation.platform === "instagram" ? (
                    <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  <span className="text-sm text-gray-900">
                    {selectedConversation.platform === "instagram" ? "Instagram DM" : "Facebook Messenger"}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="text-xs text-gray-500 mb-1">{t.email}</div>
                <span className="text-sm text-gray-900">{selectedConversation.email}</span>
              </div>

              {/* Phone */}
              <div>
                <div className="text-xs text-gray-500 mb-1">{t.phone}</div>
                <span className="text-sm text-gray-900">{selectedConversation.phone}</span>
              </div>

              {/* Tags */}
              <div>
                <div className="text-xs text-gray-500 mb-2">{t.tags}</div>
                <div className="flex flex-wrap gap-2">
                  {selectedConversation.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                  <button className="px-2 py-1 border border-dashed border-gray-300 text-gray-600 rounded text-xs hover:border-[#7C3AED] hover:text-[#7C3AED]">
                    + {t.addTag}
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <div className="text-xs text-gray-500 mb-2">{t.notes}</div>
                <textarea
                  placeholder={t.addNotes}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none text-right"
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <button className="w-full px-4 py-2 bg-[#7C3AED] text-white rounded-lg hover:bg-[#6D28D9] flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {t.viewFullProfile}
                </button>

                <button className="w-full px-4 py-2 border border-[#7C3AED] text-[#7C3AED] rounded-lg hover:bg-purple-50 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {t.sendEmailAction}
                </button>

                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t.deleteConversation}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
