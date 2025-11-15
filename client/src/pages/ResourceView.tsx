import { useRoute, Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Clock, 
  FileText, 
  Video, 
  Headphones, 
  BookOpen,
  Play,
  Download,
  Share2,
  Bookmark
} from "lucide-react";
import { motion } from "framer-motion";

// Resource data - matching the structure from Resources.tsx
const resources = [
  {
    id: 1,
    title: "Understanding Anxiety: A Student's Guide",
    type: "Article",
    category: "Anxiety",
    duration: "8 min read",
    icon: FileText,
    description: "Learn about anxiety triggers, symptoms, and practical coping strategies for campus life.",
    content: `Anxiety is a common experience for students navigating the challenges of campus life. This comprehensive guide explores the various triggers and symptoms of anxiety, providing practical strategies to manage and overcome these feelings.

## What is Anxiety?

Anxiety is your body's natural response to stress. It's a feeling of fear or apprehension about what's to come. For students, this might manifest as worry about exams, social situations, or future career prospects.

## Common Triggers for Students

- Academic pressure and deadlines
- Social situations and making friends
- Financial concerns
- Future career uncertainty
- Homesickness
- Relationship challenges

## Recognizing Symptoms

Physical symptoms may include:
- Rapid heartbeat
- Sweating or trembling
- Fatigue or restlessness
- Difficulty concentrating
- Sleep disturbances

## Coping Strategies

1. **Breathing Exercises**: Practice deep breathing techniques when you feel anxious
2. **Time Management**: Create a realistic schedule to reduce academic pressure
3. **Physical Activity**: Regular exercise can significantly reduce anxiety levels
4. **Mindfulness**: Practice meditation or mindfulness exercises
5. **Seek Support**: Don't hesitate to reach out to campus counseling services

Remember, it's okay to ask for help. Your mental health is just as important as your academic success.`,
    author: "Dr. Sarah Johnson",
    publishedDate: "March 15, 2024",
    tags: ["Anxiety", "Student Life", "Coping Strategies"]
  },
  {
    id: 2,
    title: "Breathing Exercises for Stress Relief",
    type: "Video",
    category: "Stress",
    duration: "12 min",
    icon: Video,
    description: "Follow along with guided breathing techniques to calm your mind during stressful moments.",
    content: `This guided video session will walk you through several proven breathing techniques designed to help you manage stress and anxiety effectively.

## Techniques Covered

### 1. Box Breathing
A simple technique used by athletes and professionals to maintain calm under pressure.

### 2. 4-7-8 Breathing
A powerful technique that can help you fall asleep faster and reduce anxiety.

### 3. Diaphragmatic Breathing
Deep belly breathing that activates your body's relaxation response.

## When to Use These Techniques

- Before exams or presentations
- During moments of panic or overwhelm
- When you can't sleep
- Anytime you feel stressed or anxious

Follow along with the video and practice these techniques regularly for best results.`,
    author: "Mindfulness Coach Emma Chen",
    publishedDate: "February 28, 2024",
    tags: ["Stress Relief", "Breathing", "Meditation"]
  },
  {
    id: 3,
    title: "Sleep Better: Tips for Students",
    type: "Audio",
    category: "Sleep",
    duration: "15 min",
    icon: Headphones,
    description: "Guided meditation and sleep hygiene tips to improve your rest and recovery.",
    content: `Quality sleep is essential for academic success and overall well-being. This audio guide combines sleep hygiene tips with a calming meditation to help you achieve better rest.

## Sleep Hygiene Tips

1. **Consistent Schedule**: Go to bed and wake up at the same time every day
2. **Create a Routine**: Develop a relaxing pre-sleep routine
3. **Limit Screen Time**: Avoid screens at least an hour before bed
4. **Comfortable Environment**: Keep your room cool, dark, and quiet
5. **Avoid Caffeine**: Limit caffeine intake, especially in the afternoon

## Guided Meditation Included

The audio includes a 10-minute guided meditation designed to help you:
- Release physical tension
- Quiet your mind
- Drift into peaceful sleep

Listen to this audio as you prepare for bed, and make it part of your nightly routine for best results.`,
    author: "Sleep Specialist Dr. Michael Park",
    publishedDate: "March 1, 2024",
    tags: ["Sleep", "Meditation", "Wellness"]
  },
  {
    id: 4,
    title: "Managing Academic Pressure",
    type: "Article",
    category: "Stress",
    duration: "10 min read",
    icon: FileText,
    description: "Strategies to balance coursework, exams, and self-care without burning out.",
    content: `Academic pressure is a reality for most students, but it doesn't have to overwhelm you. This article provides practical strategies to manage your workload while maintaining your mental health.

## Understanding Academic Pressure

Academic pressure comes from various sources:
- High expectations from yourself or others
- Heavy course loads
- Competitive environments
- Fear of failure
- Time constraints

## Effective Strategies

### 1. Prioritize and Plan
- Use a planner or digital calendar
- Break large tasks into smaller, manageable steps
- Set realistic goals and deadlines

### 2. Practice Self-Care
- Maintain regular sleep schedules
- Eat nutritious meals
- Exercise regularly
- Take breaks when needed

### 3. Seek Support
- Form study groups
- Utilize office hours
- Access campus resources
- Talk to counselors when overwhelmed

### 4. Develop Healthy Study Habits
- Find your optimal study environment
- Use active learning techniques
- Avoid cramming
- Take regular breaks

Remember, your worth is not determined by your grades. Balance is key to long-term success.`,
    author: "Academic Counselor Lisa Thompson",
    publishedDate: "February 20, 2024",
    tags: ["Academic Success", "Stress Management", "Time Management"]
  },
  {
    id: 5,
    title: "Building Healthy Relationships",
    type: "Video",
    category: "Relationships",
    duration: "18 min",
    icon: Video,
    description: "Understanding boundaries, communication, and maintaining connections in college.",
    content: `College is a time of significant social growth. This video guide helps you navigate relationships, set healthy boundaries, and build meaningful connections.

## Topics Covered

### Communication Skills
- Active listening techniques
- Expressing needs clearly
- Handling conflicts constructively

### Setting Boundaries
- Recognizing your limits
- Saying no without guilt
- Respecting others' boundaries

### Building Connections
- Making friends in new environments
- Maintaining long-distance relationships
- Building professional networks

### Red Flags to Watch For
- Unhealthy relationship patterns
- Signs of toxic friendships
- When to seek help

This comprehensive guide will help you build the social skills necessary for healthy relationships throughout your life.`,
    author: "Relationship Counselor Dr. James Wilson",
    publishedDate: "March 10, 2024",
    tags: ["Relationships", "Communication", "Boundaries"]
  },
  {
    id: 6,
    title: "Recognizing Depression Signs",
    type: "Article",
    category: "Depression",
    duration: "7 min read",
    icon: FileText,
    description: "Identify early warning signs and when to seek professional support.",
    content: `Depression is more than just feeling sad. It's a serious mental health condition that affects millions of students. Early recognition and treatment are crucial for recovery.

## Warning Signs

### Emotional Symptoms
- Persistent sadness or emptiness
- Loss of interest in activities you once enjoyed
- Feelings of hopelessness or worthlessness
- Irritability or frustration
- Difficulty concentrating or making decisions

### Physical Symptoms
- Changes in sleep patterns (too much or too little)
- Changes in appetite or weight
- Fatigue or loss of energy
- Unexplained aches and pains

### Behavioral Changes
- Withdrawing from friends and activities
- Neglecting responsibilities
- Substance use
- Thoughts of self-harm or suicide

## When to Seek Help

If you experience several of these symptoms for more than two weeks, it's important to seek professional help. Depression is treatable, and you don't have to face it alone.

## Getting Support

- Campus counseling services
- Mental health hotlines
- Trusted friends or family
- Healthcare providers

Remember, seeking help is a sign of strength, not weakness.`,
    author: "Clinical Psychologist Dr. Amanda Rodriguez",
    publishedDate: "February 15, 2024",
    tags: ["Depression", "Mental Health", "Support"]
  },
  {
    id: 7,
    title: "Mindfulness Meditation for Beginners",
    type: "Audio",
    category: "Anxiety",
    duration: "10 min",
    icon: Headphones,
    description: "Start your mindfulness journey with simple, effective meditation practices.",
    content: `Mindfulness meditation is a powerful tool for managing anxiety and improving overall well-being. This beginner-friendly audio guide introduces you to the practice.

## What is Mindfulness?

Mindfulness is the practice of being fully present in the moment, aware of where we are and what we're doing, without being overly reactive or overwhelmed.

## Benefits

- Reduces anxiety and stress
- Improves focus and concentration
- Enhances emotional regulation
- Promotes better sleep
- Increases self-awareness

## Getting Started

This audio guide includes:
- A gentle introduction to meditation
- Basic breathing techniques
- Body scan practice
- Tips for maintaining a regular practice

## Practice Tips

1. Start with just 5-10 minutes daily
2. Find a quiet, comfortable space
3. Be patient with yourself
4. Consistency is more important than duration
5. Use guided meditations when starting out

Begin your mindfulness journey today and experience the transformative power of present-moment awareness.`,
    author: "Mindfulness Instructor David Kim",
    publishedDate: "March 5, 2024",
    tags: ["Mindfulness", "Meditation", "Anxiety Relief"]
  },
  {
    id: 8,
    title: "Coping with Homesickness",
    type: "Video",
    category: "Depression",
    duration: "14 min",
    icon: Video,
    description: "Practical advice for dealing with being away from home and adjusting to campus life.",
    content: `Homesickness is a common experience for students, especially those living away from home for the first time. This video provides practical strategies to help you adjust and thrive.

## Understanding Homesickness

Homesickness is a normal emotional response to being separated from familiar people and places. It can affect anyone, regardless of age or experience.

## Common Feelings

- Longing for home and family
- Sadness or loneliness
- Anxiety about being away
- Difficulty adjusting to new routines
- Feeling disconnected

## Coping Strategies

### 1. Stay Connected
- Schedule regular calls or video chats with family
- Share your experiences with loved ones
- Send photos and updates

### 2. Build New Connections
- Join clubs or organizations
- Attend campus events
- Make friends in your dorm or classes
- Find a mentor or advisor

### 3. Create Comfort
- Bring familiar items from home
- Establish new routines
- Explore your new environment
- Find places that feel like "home"

### 4. Practice Self-Care
- Maintain healthy habits
- Get enough sleep
- Eat well
- Exercise regularly

### 5. Give It Time
- Adjustment takes time
- Be patient with yourself
- Focus on the positive aspects
- Celebrate small victories

Remember, homesickness usually decreases over time as you build new connections and routines.`,
    author: "Student Support Counselor Maria Garcia",
    publishedDate: "February 25, 2024",
    tags: ["Homesickness", "Adjustment", "Student Life"]
  },
];

export default function ResourceView() {
  const [, params] = useRoute("/resources/:id");
  const resourceId = params?.id ? parseInt(params.id, 10) : undefined;
  const resource = resourceId ? resources.find(r => r.id === resourceId) : undefined;

  if (!resource) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 pt-24">
          <Card className="p-12 text-center animate-fade-in-up">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Resource Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The resource you're looking for doesn't exist.
            </p>
            <Link href="/resources">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Resources
              </Button>
            </Link>
          </Card>
        </div>
        <Footer />
        <ChatBot />
      </div>
    );
  }

  const Icon = resource.icon;

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
              <Link href="/resources">
                <Button variant="ghost" className="mb-4 hover:scale-105 transition-transform">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Resources
                </Button>
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {resource.type}
                </Badge>
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {resource.category}
                </Badge>
              </div>

              <h1 className="font-accent text-4xl md:text-5xl lg:text-6xl font-bold">
                {resource.title}
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {resource.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{resource.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>By {resource.author}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Published {resource.publishedDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <Button className="rounded-full">
                  {resource.type === "Video" ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Watch Now
                    </>
                  ) : resource.type === "Audio" ? (
                    <>
                      <Headphones className="w-4 h-4 mr-2" />
                      Listen Now
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read Article
                    </>
                  )}
                </Button>
                <Button variant="outline" className="rounded-full">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save for Later
                </Button>
                <Button variant="outline" className="rounded-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                {resource.type === "Article" && (
                  <Button variant="outline" className="rounded-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 py-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 md:p-12 shadow-lg border-2">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                  {resource.content}
                </div>
              </div>
            </Card>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {resource.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Related Actions */}
            <div className="mt-8 pt-8 border-t">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div>
                  <h3 className="font-semibold mb-2">Need More Help?</h3>
                  <p className="text-sm text-muted-foreground">
                    Our counseling services are available 24/7 for students
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link href="/counselors">
                    <Button variant="outline">
                      Find a Counselor
                    </Button>
                  </Link>
                  <Link href="/chat">
                    <Button>
                      Chat with AI
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

