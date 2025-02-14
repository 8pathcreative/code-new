import React from 'react';
import { SEO } from '@/components/SEO';

const people = [
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: '/images/team/placeholder.svg',
  },
  {
    name: 'Lindsay Walton',
    role: 'Front-end Developer',
    imageUrl: '/images/team/placeholder.svg',
  },
  {
    name: 'Tom Cook',
    role: 'Director of Product',
    imageUrl: '/images/team/placeholder.svg',
  },
  {
    name: 'Whitney Francis',
    role: 'Copywriter',
    imageUrl: '/images/team/placeholder.svg',
  },
  {
    name: 'Leonard Krasner',
    role: 'Senior Designer',
    imageUrl: '/images/team/placeholder.svg',
  },
  {
    name: 'Floyd Miles',
    role: 'Principal Designer',
    imageUrl: '/images/team/placeholder.svg',
  },
];

export function About() {
  return (
    <>
      <SEO
        title="About Code Resources"
        description="Learn about Code Resources, our mission to provide the best learning materials for developers and designers, and meet our team."
        keywords={['about', 'mission', 'team', 'developers', 'designers']}
      />
      
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our team</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
              best resources for developers and designers.
            </p>
          </div>
          <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-32 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Code Resources</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Code Resources is a curated collection of the best resources for designers and developers.
              Our mission is to help you find high-quality tutorials, tools, and learning materials
              to enhance your skills and stay up-to-date with the latest technologies.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl lg:mx-0">
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">For Developers</h3>
                <p className="mt-2 text-base text-gray-600">
                  Find tutorials and guides for popular frameworks, programming languages, and development tools.
                  Stay updated with best practices and improve your coding skills.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">For Designers</h3>
                <p className="mt-2 text-base text-gray-600">
                  Discover resources for UI/UX design, design systems, and creative tools.
                  Learn about design principles and stay inspired with the latest design trends.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Curated Content</h3>
                <p className="mt-2 text-base text-gray-600">
                  Every resource is carefully selected and reviewed to ensure it provides value
                  to our community. We focus on quality over quantity.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Community Driven</h3>
                <p className="mt-2 text-base text-gray-600">
                  Our platform grows with input from the community. We welcome suggestions
                  and feedback to make the resource collection more valuable for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}