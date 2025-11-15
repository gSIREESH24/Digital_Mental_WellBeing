import { useRoute, Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  MessageCircle,
  Clock,
  Heart,
  Share2,
  Flag,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ForumTopic {
  id: number;
  title: string;
  author: string;
  avatar: string;
  replyCount: number;   // 🔥 FIXED
  category: string;
  timestamp: string;
  excerpt: string;
  content: string;
}

interface Reply {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

const topicsData: Record<number, ForumTopic & { replies: Reply[] }> = {
  1: {
    id: 1,
    title: "Dealing with exam anxiety",
    author: "Anonymous Student",
    avatar: "AS",
    replyCount: 23,    // 🔥 FIXED
    category: "Anxiety",
    timestamp: "2 hours ago",
    excerpt: "Finals are coming up and I'm feeling overwhelmed.",
    content:
      "Finals are coming up and I'm feeling overwhelmed. I've been studying for weeks but I can't shake this constant feeling of anxiety. Every time I try to focus, my mind races with thoughts of failure. I know I've prepared, but the pressure is getting to me. How do you all manage exam stress? Any tips would be really appreciated.",
    replies: [
      {
        id: 1,
        author: "Study Buddy",
        avatar: "SB",
        content:
          "I totally understand what you're going through! Breaking study sessions into smaller chunks helps a lot.",
        timestamp: "1 hour ago",
        likes: 12,
      },
      {
        id: 2,
        author: "Calm Mind",
        avatar: "CM",
        content:
          "Your worth isn't determined by grades. Deep breathing helps before studying.",
        timestamp: "45 minutes ago",
        likes: 18,
      },
      {
        id: 3,
        author: "Grad Student",
        avatar: "GS",
        content:
          "Make a realistic study schedule and get enough sleep for better retention.",
        timestamp: "30 minutes ago",
        likes: 15,
      },
    ],
  },

  2: {
    id: 2,
    title: "Tips for better sleep schedule",
    author: "Night Owl",
    avatar: "NO",
    replyCount: 15,   // 🔥 FIXED
    category: "Wellness",
    timestamp: "5 hours ago",
    excerpt: "I've been staying up late and it's affecting my energy.",
    content:
      "I've been staying up late, and it's affecting my energy. I want to fix my sleep cycle.",
    replies: [
      {
        id: 1,
        author: "Early Bird",
        avatar: "EB",
        content:
          "Gradually sleep earlier by 15 minutes per day. Reduce screen time!",
        timestamp: "4 hours ago",
        likes: 10,
      },
      {
        id: 2,
        author: "Sleep Well",
        avatar: "SW",
        content:
          "Create a bedtime routine. Read, dim lights, relax your mind before bed.",
        timestamp: "3 hours ago",
        likes: 14,
      },
    ],
  },

  3: {
    id: 3,
    title: "Feeling homesick",
    author: "First Year",
    avatar: "FY",
    replyCount: 31,   // 🔥 FIXED
    category: "Support",
    timestamp: "1 day ago",
    excerpt: "Missing home a lot lately. How do you all cope with being away?",
    content:
      "Missing home a lot lately. This is my first semester away, and it’s harder than expected.",
    replies: [
      {
        id: 1,
        author: "Sophomore",
        avatar: "SO",
        content:
          "Homesickness is normal! Video call family & try joining campus activities.",
        timestamp: "20 hours ago",
        likes: 25,
      },
      {
        id: 2,
        author: "Campus Guide",
        avatar: "CG",
        content:
          "Decorate your space and explore campus to make it feel like home.",
        timestamp: "18 hours ago",
        likes: 19,
      },
      {
        id: 3,
        author: "Supportive Peer",
        avatar: "SP",
        content:
          "Focus on new opportunities and reach out for support when needed.",
        timestamp: "15 hours ago",
        likes: 22,
      },
    ],
  },
};

export default function SupportTopicView() {
  const [, params] = useRoute("/support/topic/:id");
  const topicId = params?.id ? parseInt(params.id) : undefined;
  const topic = topicId ? topicsData[topicId] : undefined;

  const [newReply, setNewReply] = useState("");
  const [replies, setReplies] = useState<Reply[]>([]);

  useEffect(() => {
    if (topic) {
      setReplies(topic.replies || []);
    }
  }, [topic]);

  const handleSubmitReply = () => {
    if (newReply.trim().length < 10) {
      alert("Reply must be at least 10 characters.");
      return;
    }

    const reply: Reply = {
      id: replies.length + 1,
      author: "You",
      avatar: "YO",
      content: newReply,
      timestamp: "Just now",
      likes: 0,
    };

    setReplies([...replies, reply]);
    setNewReply("");
  };

  if (!topic) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 pt-24">
          <Card className="p-12 text-center animate-fade-in-up">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Topic Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The discussion topic you're looking for doesn't exist.
            </p>
            <Link href="/support">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Support
              </Button>
            </Link>
          </Card>
        </div>
        <Footer />
        <ChatBot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ChatBot />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative w-full py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <Link href="/support">
                <Button variant="ghost" className="mb-4 hover:scale-105 transition-transform">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary">{topic.category}</Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  <span>{replies.length} replies</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{topic.timestamp}</span>
                </div>
              </div>

              <h1 className="font-accent text-4xl md:text-5xl lg:text-6xl font-bold">
                {topic.title}
              </h1>

              <div className="flex items-center gap-4 pt-4 border-t">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {topic.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{topic.author}</p>
                  <p className="text-sm text-muted-foreground">{topic.timestamp}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="container mx-auto px-4 py-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="p-8 md:p-12 shadow-lg border-2">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {topic.content}
              </p>

              <div className="flex items-center gap-4 mt-6 pt-6 border-t">
                <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4 mr-2" /> Like
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
                <Button variant="ghost" size="sm">
                  <Flag className="w-4 h-4 mr-2" /> Report
                </Button>
              </div>
            </Card>

            {/* Replies */}
            <div className="space-y-4">
              <h2 className="font-accent text-2xl font-bold">
                Replies ({replies.length})
              </h2>

              {replies.map((reply, index) => (
                <motion.div
                  key={reply.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="p-6 border-2">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          {reply.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{reply.author}</p>
                        <p className="text-xs text-muted-foreground">{reply.timestamp}</p>
                        <p className="text-muted-foreground leading-relaxed mt-2">{reply.content}</p>
                        <Button variant="ghost" size="sm" className="mt-3">
                          <Heart className="w-3 h-3 mr-1" />
                          {reply.likes}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {replies.length === 0 && (
                <Card className="p-8 text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">No replies yet. Be the first!</p>
                </Card>
              )}
            </div>

            {/* Reply Form */}
            <Card className="p-6 border-2">
              <h3 className="font-semibold text-lg mb-4">Add a Reply</h3>
              <Textarea
                placeholder="Share your thoughts…"
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                className="min-h-[120px]"
              />
              <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={() => setNewReply("")}>
                  Clear
                </Button>
                <Button
                  onClick={handleSubmitReply}
                  disabled={newReply.trim().length < 10}
                  className="rounded-full"
                >
                  Post Reply
                </Button>
              </div>
            </Card>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
