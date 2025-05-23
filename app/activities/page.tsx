"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for company activities
const activities = {
  workshops: [
    {
      id: "team-1",
      title: "Yandex Ads 8.10",
      date: "Nov 11-12, 2024",
      location: "DaNang city, Vietnam",
      description:
        "The event featured presentations on global revenue optimization with Easy Monetization, user acquisition and monetization strategies with Mintegral, and app growth tools like ROI360 and iOS Suite. Hosts also participated in discussions with businesses, including the Limgrow team.",
      images: [
        "/workshop/ws1/ws4.jpg?height=400&width=600&query=team building workshop",
        "/workshop/ws1/ws1.jpg?height=400&width=600&query=team building retreat lake",
        "/workshop/ws1/ws2.jpg?height=400&width=600&query=company retreat activities",
        "/workshop/ws1/ws3.jpg?height=400&width=600&query=team building workshop",
      ],
    },
    {
      id: "team-2",
      title: "Winning App Marketing Strategies: Insights from Google & Adjust",
      date: "August 1, 2024",
      location: "DaNang city, Vietnam",
      description:
        "The event introduced practical solutions and proven marketing strategies to effectively drive app growth. The program featured expert talks, panel discussions with guest speakers, and interactive Q&A sessions.",
      images: [
        "/workshop/ws2/ws3.jpg?height=400&width=600&query=team building workshop",
        "/workshop/ws2/ws4.jpg?height=400&width=600&query=team building workshop",
        "/workshop/ws2/ws1.jpg?height=400&width=600&query=team building retreat lake",
        "/workshop/ws2/ws2.jpg?height=400&width=600&query=company retreat activities",
        "/workshop/ws2/ws5.jpg?height=400&width=600&query=team building workshop",
        "/workshop/ws2/ws6.jpg?height=400&width=600&query=team building workshop",
      ],
    },
    {
      id: "team-3",
      title: "Think Apps Vietnam 2024",
      date: "July 15, 2024 ",
      location: "Hanoi Capital, Vietnam",
      description:
        "Limgrow participated in Think Apps Vietnam 2024 on July 11 in Hanoi, where top industry leaders from Google, AppMagic, VNG, ELSA, and Amanotes shared real-world strategies for app success. The event explored how Google AI is shaping the future of app development, with practical insights, tools, and networking opportunities that inspired innovation and growth.",
      images: [
        "/workshop/ws3/ws2.jpg?height=400&width=600&query=team building retreat lake",
        "/workshop/ws3/ws1.jpg?height=400&width=600&query=team building workshop",
      ],
    },
  ],
  sports: [
    {
      id: "hack-1",
      title: "Badminton Tournament",
      date: "Every Tuesday and Friday weekly",
      location: "DaNang city, Vietnam",
      description:
        "A weekly badminton tournament for employees to compete in friendly matches, showcase their skills, and promote team spirit and healthy living.",
      images: [
        "/sports/sp2.jpg?height=400&width=600&query=team building workshop",
        "/sports/sp1.jpg?height=400&width=600&query=team building workshop",
        "/sports/sp3.jpg?height=400&width=600&query=team building workshop",
        "/sports/sp4.jpg?height=400&width=600&query=team building workshop",
      ],
    },
    {
      id: "hack-2",
      title: "Football tournament",
      date: "Every Wednesday weekly",
      location: "DaNang city, Vietnam",
      description:
        "A weekly football tournament for employees to compete in friendly matches, build teamwork, and promote fitness and camaraderie.",
      images: [
        "/sports/sp5.jpg?height=400&width=600&query=team building workshop",
        "/sports/sp7.jpg?height=400&width=600&query=team building workshop",
      ],
    },
  ],
  teambuildings: [
    {
      id: "community-1",
      title: "Thailand Team Building Retreat",
      date: "April 17, 2024",
      location: "Multiple Locations",
      description:
        "An ongoing team-building program held in multiple locations across Thailand, focused on fostering teamwork, communication, and leadership through various activities.",
      images: [
        "/teambuilding/thailan/tb4.jpg?height=400&width=600&query=team building workshop",
        "/teambuilding/thailan/tb1.jpg?height=400&width=600&query=team building workshop",
        "/teambuilding/thailan/tb2.jpg?height=400&width=600&query=team building workshop",
        "/teambuilding/thailan/tb3.jpg?height=400&width=600&query=team building workshop",
      ],
    },
    {
      id: "community-2",
      title: "Quang Binh Team Building Retreat",
      date: "May 14, 2023",
      location: "Vietnam",
      description:
        "A team-building retreat in Quang Binh designed to strengthen collaboration, improve communication, and boost team morale through various outdoor activities.",
      images: [
        "/teambuilding/quangbinh/qb3.jpg?height=400&width=600&query=team building workshop",
        "/teambuilding/quangbinh/qb1.jpg?height=400&width=600&query=team building workshop",
        "/teambuilding/quangbinh/qb2.jpg?height=400&width=600&query=team building workshop",
        "/teambuilding/quangbinh/qb4.jpg?height=400&width=600&query=team building workshop",
      ],
    },
    {
      id: "community-2",
      title: "Yen Retreat",
      date: "Jan 23, 2025",
      location: "Vietnam",
      description:
        "A team-building retreat designed to strengthen collaboration, improve communication, and boost team morale through various outdoor activities.",
      images: [
        "/teambuilding/vietnam/tb1.jpg?height=400&width=600&query=team building workshop",
        "/teambuilding/vietnam/tb2.jpg?height=400&width=600&query=team building workshop",
        "/teambuilding/vietnam/tb3.jpg?height=400&width=600&query=team building workshop",
        "/teambuilding/vietnam/tb4.jpg?height=400&width=600&query=team building workshop",
        "/teambuilding/vietnam/tb5.jpg?height=400&width=600&query=team building workshop",
      ],
    },
  ],
};

export default function ActivitiesPage() {
  const [selectedActivity, setSelectedActivity] = useState(null);

  return (
    <div className="container py-12">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Company Activities
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Explore the events and initiatives that shape our company culture
        </p>
      </div>

      <Tabs defaultValue="workshops" className="mt-12">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
          <TabsTrigger value="sports">Sports</TabsTrigger>
          <TabsTrigger value="teambuildings">Team Buildings</TabsTrigger>
        </TabsList>

        {Object.entries(activities).map(([category, items]) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {items.map((activity) => (
                <Card key={activity.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={activity.images[0] || "/placeholder.svg"}
                      alt={activity.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{activity.title}</CardTitle>
                    <CardDescription className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{activity.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{activity.location}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{activity.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setSelectedActivity(activity)}
                    >
                      View Gallery
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Activity Gallery Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedActivity.title}
                  </h2>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {selectedActivity.date}
                    <span className="mx-2">•</span>
                    <MapPin className="h-4 w-4" />
                    {selectedActivity.location}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedActivity(null)}
                >
                  Close
                </Button>
              </div>

              <p className="mb-6">{selectedActivity.description}</p>

              <div className="grid gap-4 sm:grid-cols-2">
                {selectedActivity.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-64 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${selectedActivity.title} image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5" />
                <span>
                  Team members participating in {selectedActivity.title}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Upcoming Events */}
      <section className="mt-24">
        <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Football Tournament - Four Nations Cup</CardTitle>
              <CardDescription>
                Tien Son Stadium, DaNang City, Vietnam
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                A friendly four-team football tournament where employees compete
                to showcase their skills and build team spirit.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>n8n Workshop & Sharing Session</CardTitle>
              <CardDescription>September 1, 2025 • Virtual</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                An interactive workshop to explore n8n automation workflows,
                share best practices, and enhance productivity.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
