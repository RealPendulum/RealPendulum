Lately to my mind came the fact, that we rarely see pendulums in our lives.

<small pendulum, a clock>

And I don't mean that will all the high-tech there's little need for mechanical contraptions - I think it's actually the opposite, we see many pendulums in the digital world. The issue is, we don't see them in the real world, the physical pendulums. The only thing that comes to my mind as a real world example would be the swing currently. But who looks at the swing with a thought of its' "pendulumness"?

<swing with a child as a pendulum>

In the digital world there are plenty of pendulums, but most of them come with a fatal flaw. They are approximations. They cut corners, so it's easy to compute them. At one point they go too far. They forget the limits of those approximations and weave the fake reality. They make you think that it's how the real world looks. Or so I would like to verify with this webpage.

<approximation within its limits>

Let's look back at the real pendulum. Let's even go further and compare it with an approximation. Do you see the difference? Which one is real?

<two pendulums, one real, one approximated>
<select which one is real>

You are correct - seems like luck is on your side.
You were wrong - but don't worry, it's just bad luck.
I should explain first what do I mean by the real pendulums and the approximated ones. Aren't both approximated, since they are digital. Well - yes, but that's a completely other topic. I hope you had some physics courses throughout your education, because I'm not going to explain all {mechanika klasyczna/kinematyka} here. Let's look at this pretty figure of a pendulum.

<figure of a pendulum, the forces are marked, there are some variables - would be really cool, if it all were moving>

We obviously assume, that the string/rod/bar/whatever is there that connects the weight to the anchor of a pendulum is weightless and completely stiff. What do we mean by completely stiff? Well, basically, that we can totally forget about it. Therefore we get a simple equation for the outcome force that is applied to the weight.

<an equation for force>

What we know from physics, is that force is a derivative of {pęd} both on mass and speed. Here we obviously assume, that the mass is constant.

<an equation for force with derivatives>

So we have linked the acceleration to the speed. That's not really a discovery. Then, it won't be any other discovery if we link speed to position.

<en equation for force with second derivative to get location>

And there we go. That's the location. That's the pendulum. This is the finest way to describe it we know of (as long as you don't include more complicated physics here). We just need to integrate it twice, and we get the function for location. There's one problem with that though. This equation is hard. Very hard. I must admit here, I forgot a bit of my physics course and I don't remember if it's impossible to find a nice little function that is the solution here, of if we haven't found it yet. But regardless, let's just assume it's not possible. What can we do about it? There are two ways.

<some numbers, idk>

We can solve it **numerically**. What does it mean? Well, in short, we can just use trial and error to find some values, that actually fit this equation. Obviously, it's not completely random. We have ways to do this stuff with less trial and less error. But it's not important here. We can calculate all the values in the world for this equation. But once someone changes a parameter in this equation, let's say, the length of the pendulum, we cannot simply modify the results. We need to calculate it all over again, with trial and error! That's why it's such a pain. That's what I mean by not having a "nice little function". It's a chore. But at least it's real. However, it's not the only way...

<idk how to represent approximation here>

Let's look at the equation back again. We have a sin function there. This is the real pain here. I wonder how to make it simpler. Let's do a wild guess - let's replace the sin function with just its argument, why not. We can check, that for the small values, it's really close. (Those who know a bit of maths know that it's simple Taylor's expansion).

<table comparing sinx and x>

So, if we agree that a small error here would be, say, 5%, we see that this **approximation** would be good to up to {number} degrees. And as it turns out now, this is really easy to solve now, provided one has some knowledge of differential equation. Solution is as goes:

<solution>

And that's it! Now we have a pretty little function from which we can get every value we want, without any guessing, with just a simple calculation. To be honest, I don't know how to compute the exponent, but my calculator is pretty good at it!

<calculator>

Remember when I said about forgetting the limits of the approximation? This is because, in the digital world, people often misuse the pendulums made with the approximate equation, using the angles far beyond what is reasonable. Could you guess which pendulum is true now?

<two pendulums on a big angle>
<choose which is right>

That was much easier was it?
Well, you're wrong, but I'll just assume you didn't pay close attention.
What is interesting to me is: do people mistake approximations, especially outside their boundaries, for the real behavior of a real pendulum? Please let me confirm that, playing <the game>.
