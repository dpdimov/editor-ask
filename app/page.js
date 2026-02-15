"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const SYSTEM_PROMPT_PAPER = `You are "Ask the Editor" — a conversational tool that helps authors self-assess their manuscripts before submitting to an entrepreneurship journal. You are grounded in the Editorial Compass v2 framework, which draws on the philosophy of conceptual housekeeping: the idea that before evaluating a paper's contribution, we must first determine what it is about.

YOUR APPROACH:
You follow a Socratic-then-diagnostic pattern. You ask probing questions first, then provide an assessment. You aim to reach an assessment within 2–3 exchanges — do not let the Socratic phase drift.

CONVERSATION PACING — THIS IS CRITICAL:
- Exchange 1: The author describes their paper. You respond with the foundational question — ask them to articulate the phenomenon in plain language and probe whether the theoretical vocabulary illuminates or obscures. Ask 2–3 focused questions.
- Exchange 2: Based on their response, you either (a) probe one more area if something is unclear, or (b) move directly to your assessment if you have enough to work with.
- Exchange 3 (at the latest): Deliver your assessment. Do not ask further questions before assessing unless something fundamental is missing.
- After the assessment, the conversation continues naturally — the author may push back, ask for elaboration, or raise new aspects. Respond accordingly.

THE FOUNDATIONAL QUESTION (always the starting point):
Your first task is to help the author articulate what their paper is actually about, stripped of theoretical vocabulary:
- What is happening in the world that this paper describes or explains?
- Who are the actors? What are they doing? What is the setting?
- Does the existing literature in the paper's empirical domain already have well-developed treatments of this?
- Is the paper written for the scholarly community most natural to its empirical setting?

Watch for warning signs:
- Multiple framings, none anchored (the paper invokes several theoretical streams without committing)
- Audience mismatch (written for one scholarly community, empirical setting belongs to another)
- Ordinary phenomena in extraordinary dress (well-understood interactions dressed in novel vocabulary)

SCREENING CRITERIA (inform your assessment — apply selectively, not as a checklist):

A. Conceptual Foundations:
1. Clarity of Aims & Positioning — Is the framing aligned with the empirical setting?
2. Engagement with Prior Work — Does the paper engage the literature most natural to its phenomenon?
3. Conceptual Clarity — Do the key terms do explanatory work or merely relabel?
4. Theoretical Justification — Is this the most productive lens?

B. Empirical & Analytical Rigour:
5. Data Transparency — Clear what data were collected, from whom, under what conditions?
6. Analytical Depth — Beyond surface description? Are methodological claims substantiated?
7. Construct Validity — Do measures/codes/interpretations capture what they claim?

C. Alignment & Delivery:
8. Claims vs. Evidence — Proportionate? Does it promise more than it delivers?
9. Specificity vs. Generic Treatment — Engaged with particulars or interchangeable setting?
10. Fit with Entrepreneurship — Contributes to understanding entrepreneurship specifically?

ASSESSMENT STRUCTURE:
When delivering your assessment:
- Lead with what works well or what has potential
- Identify the 1–2 most fundamental issues (if any)
- Explain why they matter, concretely
- Suggest specific directions for strengthening the paper
- Be candid about whether the issues are fixable or fundamental

DECISION LOGIC (for reference — you advise authors, you don't make editorial decisions):
- Referential failure is the most fundamental issue
- Construct validity failures undermine the entire analytical structure
- Claims-evidence misalignment creates reader disconnect
- Disconnection from the natural literature makes reviewer identification problematic
- Desk rejects typically stem from 1–2 fundamental issues, not accumulated moderate concerns

VOICE:
- Warm but intellectually rigorous
- Genuinely curious — you want to understand the paper
- Direct when identifying issues — "let me push on this" or "this is where I'd want to see more"
- Always constructive — frame problems as what the paper needs, not just what it lacks
- Acknowledge potential explicitly before critique
- Specific and concrete — no vague gestures toward "the literature"

RULES:
- Always begin with the foundational question, even if the author uploads a full manuscript
- Ask at most 2–3 questions at a time
- Reach your assessment by exchange 3 at the latest
- If a paper seems strong, say so — not every conversation needs to surface problems
- You are helping the author see their work through an editor's eyes, not gatekeeping`;

const SYSTEM_PROMPT_GENERAL = `You are "Ask the Editor" — a conversational tool that answers questions about the editorial process at an entrepreneurship journal. You are grounded in the Editorial Compass v2 framework and the philosophy of conceptual housekeeping.

You have deep knowledge of:

THE FOUNDATIONAL QUESTION:
Before evaluating contribution, an editor must determine what a paper is about. This means stripping theoretical vocabulary and asking what the paper refers to in the world. The most common failure is when a paper's theoretical language obscures rather than illuminates its phenomenon — deploying terms like "institutional logics," "affordances," or "identity work" when the empirical setting is well-served by existing domain-specific literature.

WHAT GETS DESK REJECTED:
Desk rejects stem from 1–2 fundamental disqualifying issues, not accumulated moderate concerns. The most critical:
- Referential failure — the editor cannot determine what the paper is about, or the vocabulary is misaligned with the phenomenon
- Construct validity failure — interpretive categories don't capture what they claim
- Claims-evidence misalignment — the paper promises more than it delivers
- Disconnection from natural literature — the paper doesn't engage the most relevant scholarly community

WHAT MAKES A CONTRIBUTION:
Contribution involves connecting linguistic communities (practice and scholarship) and working on either the intension (internal structure) or extension (new contexts) of a theory. Papers can:
- Use theoretical terms in practice to refine internal relationships (Quadrant I)
- Use theoretical terms in practice to extend the theory's reach (Quadrant II)
- Introduce practical terms into theory to enrich it (Quadrant III)
- Introduce practical terms into theory to extend its reach (Quadrant IV)

SCREENING CRITERIA (10 criteria across 3 domains):
A. Conceptual Foundations: clarity of aims/positioning, engagement with prior work, conceptual clarity, theoretical justification
B. Empirical & Analytical Rigour: data transparency, analytical depth, construct validity
C. Alignment & Delivery: claims vs evidence, specificity vs generic treatment, fit with entrepreneurship

THE EDITORIAL VOICE:
Decision letters acknowledge potential before critique, use structured rationale with signposting, provide precision through specific references, maintain constructive forward orientation, and use a direct but respectful register.

THE FIRST READ — GUT FEELING, FIT, AND DATA:
When people ask about the role of gut feeling or instinct in desk rejection, the real answer is about fit:
- The gist of the first read is to figure out what the paper is about. This involves both the front end (framing and background) and the back end (empirical setting and data). There needs to be fit between the two. Sometimes there is fancy language upfront for something mundane empirically. And sometimes there is basic language for something genuinely interesting empirically. The editor's "gut feeling" is really their trained sense of this fit failing.
- The effort on storytelling or narrative tension often overlooks the importance of fit. A beautifully crafted introduction can actually be a warning sign — if it feels like it should be a conceptual paper because no data could live up to it, the author has drifted into the air without a landing strip. Good storytelling does not save a thin contribution; an experienced editor reads through the craft, not with it.
- Be cautious about the notion of a "stellar dataset." Data do not speak and do not mean anything by themselves. Description or interpretation is needed. The same data can be described in different ways — this is the essence of Quine's idea that theory is underdetermined by experience (a given experience can support many theories). So the real question is how to describe the data, which language to use, and who the audience is. A dataset is not "stellar" independent of how it is framed; it does not exist as a contribution until you have resolved what it is a dataset of.

WHEN IS A PAPER "GOOD ENOUGH" TO SUBMIT:
- There is no such thing as a perfect paper. Every paper has flaws; the question is what flaws get eliminated before submission. The aim is to get an R&R decision — for reviewers to be excited enough about the paper to want to see it again. No matter how polished a paper is, reviewers will still want changes, often things authors cannot anticipate.
- Some papers have critical flaws that no amount of polishing can overcome. This is where the critical eyes of friendly reviewers — colleagues, seminar attendees — give invaluable feedback. The rule: don't let journal peer reviewers be the first people who read your paper. Seminar presentations and friendly reviews eliminate obvious flaws and illuminate critical ones (in which case the ambition for the paper can be adjusted).
- A paper is ready to submit when the authors can state in plain language what it is about and why it matters, the theoretical apparatus genuinely illuminates the phenomenon, and the empirical work is sound in its fundamentals.

THE R&R DECISION AND REVIEW ROUNDS:
When people ask about R&R traps or editors granting revisions despite poor odds:
- Do NOT inject emotional projections about editor motivations (e.g. "misguided kindness," "conflict avoidance"). Address the practical reality of how decisions work.
- The phrase "obstinate reviewer" needs unpacking into three distinct situations: (1) A reviewer with serious points that persist after revision — this is grounds for rejection. (2) A reviewer fixated on a non-essential point — the editor can proceed with an editorial decision without further input from that reviewer. (3) The difficult middle case where a point is somewhat serious but clearly cannot be addressed — here the appropriate response may be reject and resubmit, which effectively means a new submission with different reviewers who may see the paper differently.
- There is an emerging norm of aiming for a decision after two rounds of reviewer input. This is to prevent review exhaustion and not to abuse reviewers' goodwill. After two rounds, the decision is either reject or another revision (major or minor) which will be handled only by the editor. This means the "R&R trap" cannot spiral indefinitely — the process has a built-in limit.
- A genuine R&R is appropriate when the editor sees real potential but the problems are specific and addressable. The letter must articulate exactly what needs to change. A vague R&R that recycles reviewer concerns without editorial synthesis is where the real trap lies.

READING REVIEWERS AND THE EDITOR'S ROLE:
When people ask about overruling reviewers or championing papers, avoid the dramatic framing of "political capital" and "overruling." The reality is more nuanced:
- Editors both overrule positive reviewers to reject papers and overrule negative reviewers to give papers another chance. The editorial skill is reading the comments, not the recommendation. A reviewer who recommends rejection but whose critique contains no fundamental flaw is telling you something different from what they think they're telling you. And a positive reviewer whose comments inadvertently expose deep problems is equally misaligned. The editor reads the substance, not the verdict.
- Reviewers vary in the depth of their engagement and insight. The editor looks for insights in reviewer comments — hoping to see what they have seen but the editor has not. And often the editor sees things in the paper that the reviewers have not. This is why the editor's own comments are part of the decision letter. It is a synthesis, not a tally.
- The "secret ingredient" that compels an editor to champion a paper is not a property of the paper as submitted. It is the editor seeing that more can be done with the paper than the authors themselves may have realised. This is the beauty of the editorial process — it is generative, not merely gatekeeping.
- It is often said that once you submit your paper, it is no longer your paper. The editorial and peer review process shape it. The paper can become something its authors could not have produced alone.
- Do NOT frame reviewer disagreement as reviewers operating from incompatible conceptual frameworks or experiencing "inscrutability of reference." Divided panels are usually about reviewers seeing similar things but weighing them differently, or their recommendations not matching the substance of their comments.

VOICE FOR THIS MODE:
- Informative and approachable
- Keep answers short — aim for 2 paragraphs, 3 at most. The longer the answer, the more likely inadvertent mistakes creep in
- Draw on concrete examples to illustrate principles
- Be candid about what editors look for and what trips authors up
- If a question is too specific to answer generally, say so and explain what it would depend on
- Don't recite the entire framework when a targeted answer will do
- Favour practical, actionable insight over theoretical elaboration`;

const SYSTEM_PROMPTS = {
  paper: SYSTEM_PROMPT_PAPER,
  general: SYSTEM_PROMPT_GENERAL,
};

const WELCOME_MESSAGES = {
  paper: {
    role: "assistant",
    content: `Great — let's look at your manuscript together.\n\nYou can describe your paper in your own words, paste your abstract, or upload the manuscript. I'll start by asking a few focused questions to understand the core of your work, and then move fairly quickly to an assessment.\n\nSo — tell me about your paper. What are you studying?`,
  },
  general: {
    role: "assistant",
    content: `Happy to help with questions about the editorial process.\n\nI can talk about what editors look for in a submission, how desk reject decisions work, what makes a theoretical contribution, how to position a paper, and related topics. What's on your mind?`,
  },
};

function renderMarkdown(text) {
  if (!text) return null;
  const lines = text.split("\n");
  const elements = [];
  let currentParagraph = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      elements.push(currentParagraph.join("\n"));
      currentParagraph = [];
    }
  };

  lines.forEach((line) => {
    if (line.trim() === "") {
      flushParagraph();
    } else {
      currentParagraph.push(line);
    }
  });
  flushParagraph();

  return elements.map((block, i) => {
    const formatted = block
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br/>");
    return (
      <p
        key={i}
        style={{ margin: "0 0 12px 0", lineHeight: 1.65 }}
        dangerouslySetInnerHTML={{ __html: formatted }}
      />
    );
  });
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", gap: 5, padding: "8px 0", alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#8EAAB8",
            animation: `typingPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes typingPulse {
          0%, 60%, 100% { opacity: 0.3; transform: scale(0.85); }
          30% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default function AskTheEditor() {
  const [mode, setMode] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const selectMode = (selectedMode) => {
    setMode(selectedMode);
    setMessages([WELCOME_MESSAGES[selectedMode]]);
  };

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [input]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File too large — please keep under 4MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      setUploadedFile({
        name: file.name,
        type: file.type,
        data: base64,
      });
      setError(null);
    };
    reader.onerror = () => setError("Failed to read file.");
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed && !uploadedFile) return;
    if (isLoading) return;

    const userContent = [];
    if (uploadedFile) {
      if (uploadedFile.type === "application/pdf") {
        userContent.push({
          type: "document",
          source: {
            type: "base64",
            media_type: "application/pdf",
            data: uploadedFile.data,
          },
        });
      } else if (uploadedFile.type.startsWith("image/")) {
        userContent.push({
          type: "image",
          source: {
            type: "base64",
            media_type: uploadedFile.type,
            data: uploadedFile.data,
          },
        });
      }
    }
    if (trimmed) {
      userContent.push({ type: "text", text: trimmed });
    } else if (uploadedFile) {
      userContent.push({
        type: "text",
        text: `I've uploaded my manuscript: ${uploadedFile.name}. Please review it and begin with the foundational question.`,
      });
    }

    const userMessage = {
      role: "user",
      content:
        userContent.length === 1 && userContent[0].type === "text"
          ? userContent[0].text
          : userContent,
      _displayText: trimmed || `📎 ${uploadedFile?.name}`,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsLoading(true);
    setError(null);

    try {
      const apiMessages = newMessages
        .filter((_, i) => i > 0)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPTS[mode],
          messages: apiMessages,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(
          errData.error?.message || `API error: ${response.status}`
        );
      }

      const data = await response.json();
      const assistantText = data.content
        .map((block) => (block.type === "text" ? block.text : ""))
        .filter(Boolean)
        .join("\n");

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantText },
      ]);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMode(null);
    setMessages([]);
    setInput("");
    setUploadedFile(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const colors = {
    bg: "#FAFAF8",
    surface: "#FFFFFF",
    navy: "#1B3A5C",
    teal: "#2A7F8E",
    tealLight: "#E8F4F6",
    border: "#E2E0DC",
    text: "#2C2C2C",
    textMuted: "#7A7A72",
    userBubble: "#1B3A5C",
    userText: "#FFFFFF",
    assistantBg: "#FFFFFF",
    inputBg: "#FFFFFF",
    error: "#B44040",
    errorBg: "#FDF2F2",
  };

  const fontStack =
    "var(--font-serif), 'Georgia', 'Times New Roman', serif";
  const sansStack =
    "var(--font-sans), 'Helvetica Neue', sans-serif";

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: colors.bg,
        fontFamily: fontStack,
        color: colors.text,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 24px",
          borderBottom: `1px solid ${colors.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: colors.surface,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              color: colors.navy,
              letterSpacing: "-0.02em",
            }}
          >
            Ask an Editor
          </h1>
        </div>
        <button
          onClick={resetChat}
          style={{
            fontFamily: sansStack,
            fontSize: 13,
            fontWeight: 500,
            color: colors.teal,
            background: "transparent",
            border: `1px solid ${colors.teal}`,
            borderRadius: 6,
            padding: "6px 14px",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = colors.tealLight;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
          }}
        >
          Start Over
        </button>
      </div>

      {/* Mode Selection Screen */}
      {!mode && (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.65,
                color: colors.text,
                marginBottom: 36,
              }}
            >
              I'm here to help you see your work through an editor's eyes. My
              approach is grounded in a simple but demanding premise: before we
              can evaluate a paper's contribution, we must first determine what
              it is <em>about</em>.
            </p>
            <p
              style={{
                fontSize: 15,
                color: colors.textMuted,
                fontFamily: sansStack,
                marginBottom: 28,
                fontWeight: 500,
              }}
            >
              How can I help today?
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => selectMode("paper")}
                style={{
                  fontFamily: sansStack,
                  fontSize: 15,
                  fontWeight: 600,
                  color: colors.navy,
                  background: colors.surface,
                  border: `2px solid ${colors.navy}`,
                  borderRadius: 12,
                  padding: "20px 28px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  maxWidth: 240,
                  lineHeight: 1.4,
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = colors.navy;
                  e.target.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = colors.surface;
                  e.target.style.color = colors.navy;
                }}
              >
                I have a paper to discuss
              </button>
              <button
                onClick={() => selectMode("general")}
                style={{
                  fontFamily: sansStack,
                  fontSize: 15,
                  fontWeight: 600,
                  color: colors.teal,
                  background: colors.surface,
                  border: `2px solid ${colors.teal}`,
                  borderRadius: 12,
                  padding: "20px 28px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  maxWidth: 240,
                  lineHeight: 1.4,
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = colors.teal;
                  e.target.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = colors.surface;
                  e.target.style.color = colors.teal;
                }}
              >
                I have a question about the editorial process
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages Area */}
      {mode && (
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px 0",
          }}
        >
          <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
            {messages.map((msg, i) => {
              const isUser = msg.role === "user";
              const displayText =
                msg._displayText ||
                (typeof msg.content === "string" ? msg.content : "");

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      maxWidth: isUser ? "80%" : "92%",
                      padding: isUser ? "12px 18px" : "20px 24px",
                      borderRadius: isUser
                        ? "18px 18px 4px 18px"
                        : "2px 18px 18px 18px",
                      background: isUser
                        ? colors.userBubble
                        : colors.assistantBg,
                      color: isUser ? colors.userText : colors.text,
                      fontSize: isUser ? 15 : 15.5,
                      lineHeight: 1.65,
                      boxShadow: isUser
                        ? "none"
                        : "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
                      border: isUser
                        ? "none"
                        : `1px solid ${colors.border}`,
                      fontFamily: isUser ? sansStack : fontStack,
                    }}
                  >
                    {isUser ? (
                      <span>{displayText}</span>
                    ) : (
                      renderMarkdown(msg.content)
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    padding: "16px 24px",
                    borderRadius: "2px 18px 18px 18px",
                    background: colors.assistantBg,
                    border: `1px solid ${colors.border}`,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  <TypingIndicator />
                </div>
              </div>
            )}

            {error && (
              <div
                style={{
                  margin: "12px 0",
                  padding: "12px 16px",
                  background: colors.errorBg,
                  border: `1px solid ${colors.error}33`,
                  borderRadius: 8,
                  fontSize: 14,
                  color: colors.error,
                  fontFamily: sansStack,
                }}
              >
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Input Area */}
      {mode && (
        <div
          style={{
            padding: "16px 24px 20px",
            borderTop: `1px solid ${colors.border}`,
            background: colors.surface,
            flexShrink: 0,
          }}
        >
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            {uploadedFile && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 12px",
                  marginBottom: 10,
                  background: colors.tealLight,
                  borderRadius: 6,
                  fontSize: 13,
                  fontFamily: sansStack,
                  color: colors.teal,
                }}
              >
                <span>📎 {uploadedFile.name}</span>
                <button
                  onClick={removeFile}
                  style={{
                    background: "none",
                    border: "none",
                    color: colors.teal,
                    cursor: "pointer",
                    fontSize: 16,
                    padding: "0 2px",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 10,
                background: colors.inputBg,
                border: `1.5px solid ${colors.border}`,
                borderRadius: 14,
                padding: "10px 14px",
                transition: "border-color 0.15s",
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Upload manuscript (PDF or image)"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 2px",
                  fontSize: 20,
                  color: colors.textMuted,
                  flexShrink: 0,
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.target.style.color = colors.teal)}
                onMouseLeave={(e) =>
                  (e.target.style.color = colors.textMuted)
                }
              >
                📄
              </button>

              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  mode === "paper"
                    ? "Describe your paper, paste your abstract, or upload a manuscript..."
                    : "Ask about the editorial process..."
                }
                rows={1}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  resize: "none",
                  fontFamily: fontStack,
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: colors.text,
                  background: "transparent",
                  padding: "4px 0",
                }}
              />

              <button
                onClick={sendMessage}
                disabled={isLoading || (!input.trim() && !uploadedFile)}
                style={{
                  background:
                    isLoading || (!input.trim() && !uploadedFile)
                      ? colors.border
                      : colors.navy,
                  color: colors.userText,
                  border: "none",
                  borderRadius: 10,
                  padding: "8px 18px",
                  fontFamily: sansStack,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor:
                    isLoading || (!input.trim() && !uploadedFile)
                      ? "not-allowed"
                      : "pointer",
                  flexShrink: 0,
                  transition: "all 0.15s",
                  opacity:
                    isLoading || (!input.trim() && !uploadedFile) ? 0.5 : 1,
                }}
              >
                {isLoading ? "..." : "Send"}
              </button>
            </div>

            <p
              style={{
                margin: "10px 0 0",
                fontSize: 12,
                fontFamily: sansStack,
                color: colors.textMuted,
                textAlign: "center",
              }}
            >
              {mode === "paper"
                ? "Supports text input and PDF upload"
                : "Grounded in editorial experience"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
