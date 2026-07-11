"use client";

import React from 'react';
import { SpaceBetween, Container, Header, Button, Link, ColumnLayout, Box, Icon, BreadcrumbGroup } from '@cloudscape-design/components';
import { AppShell } from '@/components/layout/AppShell';

export default function HomePage() {
  return (
    <AppShell breadcrumbs={<BreadcrumbGroup items={[{ text: 'Route 53', href: '/' }]} />}>
      {/* ── MAIN WRAPPER ── */}
      <div style={{ position: 'relative' }}>

        {/* ── ABSOLUTE DARK BACKGROUND ── */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '300px',
          backgroundColor: '#0f141a',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1, padding: '40px 32px 32px' }}>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>

            {/* ── LEFT COLUMN ── */}
            <div style={{ flex: '1 1 0', minWidth: 0 }}>

              {/* Header Text */}
              <div style={{ marginBottom: '15vh' }}>
                <div style={{ color: '#9ba7b6', fontSize: '12px', marginBottom: '8px' }}>
                  Network &amp; Content Delivery
                </div>
                <h1 style={{ fontSize: '32px', margin: '0 0 12px', fontWeight: 700, color: '#fff' }}>
                  Amazon Route 53
                </h1>
                <p style={{ fontSize: '22px', margin: '0 0 12px', fontWeight: 300, color: '#fff' }}>
                  A reliable way to route users to internet applications
                </p>
                <p style={{ fontSize: '14px', margin: '0', color: '#d1d5db', maxWidth: '560px' }}>
                  Amazon Route 53 is a highly available and scalable cloud Domain Name System (DNS) web service.
                </p>
              </div>

              {/* Main Left Content (How it works, Products, etc.) */}
              <SpaceBetween size="xl">
                <div>
                  <Box variant="h2" padding={{ bottom: 's' }}>How it works</Box>
                  <Container>
                    <iframe
                      width="100%"
                      height="320"
                      src="https://www.youtube.com/embed/RGWgfhZByAI"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ display: 'block', borderRadius: '6px' }}
                    />
                  </Container>
                </div>

                <div>
                  <Box variant="h2" padding={{ bottom: 's' }}>Products</Box>
                  <Container>
                    <SpaceBetween size="l">
                      {[
                        { title: 'Domain names', desc: 'A domain is the name, such as example.com, that your users use to access your application.' },
                        { title: 'Hosted zones', desc: 'Specify how you want Route 53 to respond to DNS queries for a domain such as example.com.' },
                        { title: 'Health checks', desc: 'Monitor your applications and web resources, and direct DNS queries to healthy resources.' },
                        { title: 'Traffic flow', desc: 'Use a visual tool to create policies for multiple endpoints in complex configurations.' },
                        { title: 'Resolver', desc: 'Route DNS queries between your VPCs and your network.' },
                      ].map((prod, i) => (
                        <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                          <div style={{
                            width: '64px', height: '64px', flexShrink: 0,
                            backgroundColor: '#1f2a37', borderRadius: '6px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <img src="/assets/route53.svg" width="36" height="36" alt="" />
                          </div>
                          <div>
                            <Box variant="h4" padding={{ bottom: 'xs' }}>{prod.title}</Box>
                            <Box variant="p" color="text-body-secondary">{prod.desc}</Box>
                          </div>
                        </div>
                      ))}
                    </SpaceBetween>
                  </Container>
                </div>

                <div>
                  <Box variant="h2" padding={{ bottom: 's' }}>Benefits and features</Box>
                  <Container>
                    <ColumnLayout columns={2} variant="text-grid">
                      <div>
                        <Box variant="h4" padding={{ bottom: 'xs' }}>Highly available and reliable</Box>
                        <Box variant="p" color="text-body-secondary">
                          Amazon Route 53 is built using AWS's highly available and reliable infrastructure. Our distributed DNS servers ensure that you can consistently route your end users to your application.
                        </Box>
                      </div>
                      <div>
                        <Box variant="h4" padding={{ bottom: 'xs' }}>Designed for use with other AWS services</Box>
                        <Box variant="p" color="text-body-secondary">
                          You can use Amazon Route 53 to map domain names to your Amazon EC2 instances, Amazon S3 buckets, Amazon CloudFront distributions, and other AWS resources.
                        </Box>
                      </div>
                      <div>
                        <Box variant="h4" padding={{ bottom: 'xs' }}>Simple</Box>
                        <Box variant="p" color="text-body-secondary">
                          You can quickly sign up, and Amazon Route 53 can start to answer your DNS queries within minutes.
                        </Box>
                      </div>
                      <div>
                        <Box variant="h4" padding={{ bottom: 'xs' }}>Flexible</Box>
                        <Box variant="p" color="text-body-secondary">
                          Amazon Route 53 routes traffic based on multiple criteria, such as endpoint health, geographic location, and latency.
                        </Box>
                      </div>
                    </ColumnLayout>
                  </Container>
                </div>

                <div>
                  <Box variant="h2" padding={{ bottom: 's' }}>Use cases</Box>
                  <Container>
                    <ColumnLayout columns={2} variant="text-grid">
                      <div>
                        <Box variant="h4" padding={{ bottom: 'xs' }}>Global traffic management</Box>
                        <Box variant="p" color="text-body-secondary">
                          Route 53 Traffic Flow helps you construct sophisticated routing configurations for resources in multiple AWS and non-AWS locations. <Link external href="#">Learn more</Link>
                        </Box>
                      </div>
                      <div>
                        <Box variant="h4" padding={{ bottom: 'xs' }}>Alias to AWS resources</Box>
                        <Box variant="p" color="text-body-secondary">
                          You can use Route 53 alias records to map your zone apex (such as example.com) or a subdomain to selected AWS resources. For example, you can route traffic to ELB load balancers, CloudFront distributions, or S3 buckets configured as website endpoints. <Link external href="#">Learn more</Link>
                        </Box>
                      </div>
                    </ColumnLayout>
                  </Container>
                </div>

                <div>
                  <Box variant="h2" padding={{ bottom: 's' }}>Related services</Box>
                  <Container>
                    <ColumnLayout columns={2} variant="text-grid">
                      <div>
                        <Box variant="h4" padding={{ bottom: 'xs' }}><Link href="#">Amazon CloudFront</Link></Box>
                        <Box variant="p" color="text-body-secondary">
                          To speed up delivery of your web content, you can use Amazon CloudFront, the AWS content delivery network (CDN). CloudFront can deliver your entire website—including dynamic, static, streaming, and interactive content—by using a global network of edge locations. <Link external href="#">Learn more</Link>
                        </Box>
                      </div>
                      <div>
                        <Box variant="h4" padding={{ bottom: 'xs' }}><Link href="#">Amazon CloudWatch</Link></Box>
                        <Box variant="p" color="text-body-secondary">
                          You can use Amazon CloudWatch to monitor the status—healthy or unhealthy—of your Route 53 health checks, and get notifications when the status changes. <Link external href="#">Learn more</Link>
                        </Box>
                      </div>
                    </ColumnLayout>
                  </Container>
                </div>

              </SpaceBetween>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div style={{ flex: '0 0 340px', minWidth: '280px' }}>
              <SpaceBetween size="s">
                <Container header={<Header variant="h2">Get started with Route 53</Header>}>
                  <SpaceBetween size="m">
                    <Box variant="p" color="text-body-secondary">
                      Get started by registering a domain, configuring DNS, or using another Route 53 feature.
                    </Box>
                    <span className="aws-yellow-button">
                      <Button variant="primary" href="/get-started">Get started</Button>
                    </span>
                  </SpaceBetween>
                </Container>

                <Container header={<Header variant="h2">Pricing (US)</Header>}>
                  <Link external href="#">View pricing</Link>
                </Container>

                <Container header={<Header variant="h2">More resources <Icon name="external" size="inherit" /></Header>}>
                  <SpaceBetween size="xs">
                    <Link href="#">Documentation</Link>
                    <hr style={{ border: 'none', borderTop: '1px solid #2d3748', margin: '4px 0' }} />
                    <Link href="#">API reference</Link>
                    <hr style={{ border: 'none', borderTop: '1px solid #2d3748', margin: '4px 0' }} />
                    <Link href="#">FAQs</Link>
                    <hr style={{ border: 'none', borderTop: '1px solid #2d3748', margin: '4px 0' }} />
                    <Link href="#">Forum - DNS and health checks</Link>
                    <hr style={{ border: 'none', borderTop: '1px solid #2d3748', margin: '4px 0' }} />
                    <Link href="#">Forum - Domain name registration</Link>
                  </SpaceBetween>
                </Container>
              </SpaceBetween>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
