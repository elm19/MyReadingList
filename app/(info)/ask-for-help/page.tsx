import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Ask for Help - MyReadingList",
  description: "Find answers to your questions or submit a support request.",
};

export default function AskForHelpPage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Ask for Help</h1>
      <p>
        If you need assistance with MyReadingList, please check our Frequently Asked Questions (FAQ) section first.
        If you can&apos;t find the answer there, feel free to submit a support request.
      </p>
      <h2>Frequently Asked Questions (FAQ)</h2>
      <p>
        [Link to FAQ page - if one exists]
      </p>
      <h2>Submit a Support Request</h2>
      <p>
        Please describe your issue in detail, and we will get back to you as soon as possible.
      </p>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
          <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
          <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label htmlFor="issue" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Describe your issue</label>
          <textarea id="issue" name="issue" rows={5} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          Submit Request
        </button>
      </form>
    </div>
  );
}