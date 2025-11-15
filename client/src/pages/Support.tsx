"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ChatBot } from "@/components/ChatBot"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  MessageCircle,
  Users,
  Shield,
  Phone,
  AlertCircle,
  PlusCircle,
  Search,
} from "lucide-react"
import { Link } from "wouter"

interface ForumTopic {
  id: number
  title: string
  author: string
  avatar: string
  replies: number
  category: string
  timestamp: string
  excerpt: string
}

const supportOptions = [
  {
    title: "Anonymous Peer Forum",
    description:
      "Connect with fellow students who understand your challenges. Share experiences and support each other.",
    icon: Users,
    gradient: "from-blue-500 to-cyan-600",
    action: "Browse Topics",
  },
  {
    title: "Crisis Hotline",
    description:
      "Immediate support available 24/7 for urgent situations. Trained professionals ready to help.",
    icon: Phone,
    gradient: "from-red-500 to-orange-600",
    action: "Get Help Now",
  },
  {
    title: "Safe Space Groups",
    description:
      "Join moderated support groups for specific topics like anxiety, depression, or identity.",
    icon: Shield,
    gradient: "from-purple-500 to-pink-600",
    action: "Find a Group",
  },
]

export default function Support() {
  const [topics, setTopics] = useState<ForumTopic[]>([])
  const [filteredTopics, setFilteredTopics] = useState<ForumTopic[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [loading, setLoading] = useState(true)
  const [showDialog, setShowDialog] = useState(false)
  const [newTopic, setNewTopic] = useState({ title: "", message: "", category: "General" })
  const [showGuidelines, setShowGuidelines] = useState(false)
  const [guidelinesAccepted, setGuidelinesAccepted] = useState(false)

  // 🌿 Load sample forum topics
  useEffect(() => {
    setTimeout(() => {
      setTopics([
        {
          id: 1,
          title: "Dealing with exam anxiety",
          author: "Anonymous Student",
          avatar: "AS",
          replies: 23,
          category: "Anxiety",
          timestamp: "2 hours ago",
          excerpt: "Finals are coming up and I'm feeling overwhelmed.",
        },
        {
          id: 2,
          title: "Tips for better sleep schedule",
          author: "Night Owl",
          avatar: "NO",
          replies: 15,
          category: "Wellness",
          timestamp: "5 hours ago",
          excerpt: "I've been staying up late and it's affecting my energy.",
        },
        {
          id: 3,
          title: "Feeling homesick",
          author: "First Year",
          avatar: "FY",
          replies: 31,
          category: "Support",
          timestamp: "1 day ago",
          excerpt: "Missing home a lot lately. How do you all cope with being away?",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  // 🧠 Filter topics dynamically
  useEffect(() => {
    let filtered = topics
    if (category !== "All") filtered = filtered.filter((t) => t.category === category)
    if (search.trim()) {
      const term = search.toLowerCase()
      filtered = filtered.filter(
        (t) => t.title.toLowerCase().includes(term) || t.excerpt.toLowerCase().includes(term)
      )
    }
    setFilteredTopics(filtered)
  }, [topics, category, search])

  // ➕ Add a new topic with validation
  const handleAddTopic = () => {
    if (!guidelinesAccepted) {
      setShowGuidelines(true)
      return
    }

    const title = newTopic.title.trim()
    const message = newTopic.message.trim()

    if (title.length < 5 || message.length < 10) {
      alert("Please enter a valid title (min 5 chars) and message (min 10 chars).")
      return
    }

    const newEntry: ForumTopic = {
      id: topics.length + 1,
      title,
      author: "Anonymous",
      avatar: "AN",
      replies: 0,
      category: newTopic.category,
      timestamp: "Just now",
      excerpt: message.slice(0, 120) + (message.length > 120 ? "..." : ""),
    }

    setTopics([newEntry, ...topics])
    setShowDialog(false)
    setNewTopic({ title: "", message: "", category: "General" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        {/* 🌅 Hero Section */}
        <section className="relative w-full py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
          <div className="container mx-auto px-4 text-center space-y-6 animate-fade-in-up">
            <Badge variant="secondary" className="mb-2">Peer Support</Badge>
            <h1 className="font-accent text-4xl md:text-5xl font-bold">You're Not Alone</h1>
            <p className="text-lg text-muted-foreground">
              Connect with a supportive community of students who understand what you're going through.
            </p>
          </div>
        </section>

        {/* 🌈 Support Options (Anonymous Forum / Hotline / Safe Space) */}
        <section className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportOptions.map((option, i) => {
            const Icon = option.icon
            return (
              <Card
                key={i}
                className="hover-elevate transition-all duration-300 hover:shadow-xl border-2 hover:border-primary/30 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <CardHeader>
                  <div
                    className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${option.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{option.description}</p>
                  <Button className="w-full transition-all hover:scale-105">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </section>

        {/* 🔍 Search & Filter */}
        <section className="container mx-auto px-4 py-10 space-y-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search topics..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-border rounded-md px-3 py-2 text-sm bg-background text-black dark:text-white"
              >
                <option>All</option>
                <option>Anxiety</option>
                <option>Wellness</option>
                <option>Support</option>
                <option>Stress</option>
                <option>Relationships</option>
              </select>
              <Button onClick={() => setShowDialog(true)} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" /> New Topic
              </Button>
            </div>
          </div>

          {/* 🚨 Crisis Section */}
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-500/20 rounded-2xl p-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Crisis Support</h3>
                <p className="text-muted-foreground mb-4">
                  If you're in immediate danger or having thoughts of self-harm, please reach out for help right away.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="destructive" className="transition-all hover:scale-105">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Crisis Hotline
                  </Button>
                  <Button variant="outline" className="transition-all hover:scale-105">
                    Contact Campus Security
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 🧵 Forum Topics */}
          <div className="space-y-4">
            <h2 className="font-accent text-2xl font-bold mb-4">Recent Forum Topics</h2>
            {loading ? (
              <p className="text-center text-muted-foreground">Loading topics...</p>
            ) : filteredTopics.length > 0 ? (
              filteredTopics.map((topic, index) => (
                <Card
                  key={topic.id}
                  className="hover-elevate transition-all duration-300 hover:shadow-lg cursor-pointer border-2 hover:border-primary/20 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {topic.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                              {topic.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              by {topic.author} • {topic.timestamp}
                            </p>
                          </div>
                          <Badge variant="secondary">{topic.category}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{topic.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" /> {topic.replies} replies
                          </span>
                          <Link href={`/support/topic/${topic.id}`}>
                            <Button variant="ghost" size="sm" className="hover:text-primary">
                              View Discussion
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground italic">No topics found.</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <ChatBot />

      {/* 🆕 New Topic Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start a New Topic</DialogTitle>
            <DialogDescription>Share your experience or seek advice anonymously.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Input
              placeholder="Topic Title"
              value={newTopic.title}
              onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
            />
            <select
              value={newTopic.category}
              onChange={(e) => setNewTopic({ ...newTopic, category: e.target.value })}
              className="border border-border rounded-md px-3 py-2 text-sm w-full bg-background text-black dark:text-white"
            >
              <option>General</option>
              <option>Anxiety</option>
              <option>Wellness</option>
              <option>Support</option>
              <option>Stress</option>
              <option>Relationships</option>
            </select>
            <Textarea
              placeholder="Write your message..."
              value={newTopic.message}
              onChange={(e) => setNewTopic({ ...newTopic, message: e.target.value })}
            />
          </div>
          <Button onClick={handleAddTopic} className="mt-4 w-full">
            Post Topic
          </Button>
        </DialogContent>
      </Dialog>

      {/* ⚠️ Guidelines Alert */}
      <AlertDialog open={showGuidelines} onOpenChange={setShowGuidelines}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Community Guidelines</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2 text-left">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>No crisis content (use Crisis Support instead)</li>
                <li>Be kind and respectful</li>
                <li>Respect privacy and confidentiality</li>
                <li>No medical or diagnostic advice</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setGuidelinesAccepted(true)
                setShowGuidelines(false)
              }}
            >
              I Agree
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
